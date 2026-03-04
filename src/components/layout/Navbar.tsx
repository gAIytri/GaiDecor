/**
 * Navbar Component
 * Built with SX System - Pure sx props, no className strings
 * Features:
 * - Transparent on home page hero, white on scroll
 * - White background on all other pages
 * - Smooth color transitions for text and icons
 * - 100px height with responsive design
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useCartDrawerStore } from '@/store/useCartDrawerStore';
import MegaMenu from '@/components/layout/MegaMenu';
import { Box, Flex, Text } from '@/design-system';
import navigationData from '@/data/navigationData.json';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const itemCount = useCartStore((state) => state.getItemCount());
  const { openDrawer } = useCartDrawerStore();

  // Check if we're on home page
  const isHomePage = location.pathname === '/';

  // Detect scroll (only matters on home page)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if navbar should be transparent
  const isTransparent = isHomePage && !isScrolled && !isHovered;

  return (
    <Box
      as="nav"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        top: 0,
        height: '100px',
        bg: isTransparent ? 'bg-transparent' : 'bg-white',
        transition: 'all',
        transitionDuration: 300,
        shadow: isTransparent ? 'none' : 'sm',
        py:3
      }}
      style={{ position: 'sticky', top: 0, zIndex: 1000 }}
    >
      <Flex sx={{
        maxW: 'full',
        height: 'full',
        px: { base: 4, lg: 6 },
        alignItems: 'center',
        justifyContent: 'between',
        gap: 4
      }}>
        {/* Logo */}
        <Link to="/">
          <Flex
            sx={{
              alignItems: 'center',
              gap: 2,
              cursor: 'pointer',
              transition: 'transform',
              transitionDuration: 150,
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          >

            <Text
              as="span"
              sx={{
                fontSize: '3xl',
                fontWeight: 'bold',
                display: 'inline',
                letterSpacing: 'widest',
                transition: 'color',
                transitionDuration: 300
              }}
              style={{ color: isTransparent ? '#ffffff' : '#111827' }}
            >
              gAI DECOR
            </Text>
          </Flex>
        </Link>

        {/* Mega Menus */}
        <Flex sx={{
          alignItems: 'center',
          gap: 1,
          display: 'flex'
        }}>
          {navigationData.megaMenus.map((menu) => (
            <MegaMenu
              key={menu.categorySlug}
              title={menu.title}
              categorySlug={menu.categorySlug}
              columns={menu.columns}
              isTransparent={isTransparent}
            />
          ))}
        </Flex>

        {/* Right Section */}
        <Flex sx={{
          alignItems: 'center',
          gap: 2
        }}>
          {/* Cart */}
          <Box
            sx={{ position: 'relative', cursor: 'pointer' }}
            onClick={openDrawer}
          >
            <ShoppingCart
              className="w-5 h-5 transition-colors duration-300"
              style={{ color: isTransparent ? '#ffffff' : '#111827' }}
            />
            {itemCount > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minW: 4,
                  h: 4,
                  px: 1,
                  bg: 'bg-gray-900',
                  color: 'text-white',
                  rounded: 'full',
                  fontWeight: 'medium'
                }}
                style={{
                  top: '-8px',
                  right: '-10px',
                  fontSize: '10px',
                  lineHeight: 1
                }}
              >
                {itemCount > 99 ? '99+' : itemCount}
              </Box>
            )}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
