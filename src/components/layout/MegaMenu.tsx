/**
 * MegaMenu Component
 * Dynamic mega menu with columns + random product images
 * Features:
 * - Dynamic width based on number of columns
 * - Two random product images from category
 * - Clean, professional design
 */

import { useState, useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Import all product data for random images
import furnitureData from '@/data/furniture.json';
import rugsData from '@/data/rugs.json';
import lightingData from '@/data/lighting.json';
import decorData from '@/data/decor.json';
import artData from '@/data/art.json';
import beddingData from '@/data/bedding.json';

// Import image mappings
import {
  furnitureImagesByFilename,
  rugsImagesByFilename,
  lightingImagesByFilename,
  decorImagesByFilename,
  artImagesByFilename,
  beddingImagesByFilename
} from '@/data/images';

interface MegaMenuProps {
  title: string;
  categorySlug: string;
  columns: {
    title: string;
    links: {
      label: string;
      path: string;
      isHighlighted?: boolean;
    }[];
  }[];
  isTransparent?: boolean;
  headerHeight?: number;
}

// Get random images for a category
function getRandomImages(categorySlug: string): { image: string; name: string; id: string }[] {
  let products: { id: string; name: string; primaryImage: string }[] = [];
  let imageMap: Record<string, string> = {};

  switch (categorySlug) {
    case 'furniture':
      products = furnitureData as typeof products;
      imageMap = furnitureImagesByFilename;
      break;
    case 'rugs':
      products = rugsData as typeof products;
      imageMap = rugsImagesByFilename;
      break;
    case 'lighting':
      products = lightingData as typeof products;
      imageMap = lightingImagesByFilename;
      break;
    case 'decor':
      products = decorData as typeof products;
      imageMap = decorImagesByFilename;
      break;
    case 'art':
      products = artData as typeof products;
      imageMap = artImagesByFilename;
      break;
    case 'bedding':
      products = beddingData as typeof products;
      imageMap = beddingImagesByFilename;
      break;
    default:
      return [];
  }

  // Filter products that have valid images
  const validProducts = products.filter(p => imageMap[p.primaryImage]);

  // Shuffle and pick 2
  const shuffled = [...validProducts].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 2).map(p => ({
    image: imageMap[p.primaryImage],
    name: p.name,
    id: p.id
  }));
}

export default function MegaMenu({
  title,
  categorySlug,
  columns,
  isTransparent = false,
  headerHeight
}: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Get random images - memoized to not change on every render
  const randomImages = useMemo(() => getRandomImages(categorySlug), [categorySlug]);

  useEffect(() => {
    return () => {
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    openTimeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 100);
  };

  const handleMouseLeave = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleClose = () => {
    if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setIsOpen(false);
  };

  // Calculate grid columns based on number of link columns + 2 for images
  const totalColumns = columns.length + 2;

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <Link
        to={`/category/${categorySlug}`}
        onClick={handleClose}
        className={`flex items-center gap-1 px-6 py-2 text-sm font-medium tracking-wide uppercase transition-colors ${
          isTransparent ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'
        }`}
      >
        {title}
      </Link>

      {/* Mega Dropdown */}
      {isOpen && (
        <div
          className="fixed left-0 right-0 z-50 bg-white shadow-xl border-b border-gray-100"
          style={{ top: headerHeight ? `${headerHeight}px` : '63px' }}
        >
          <div className="max-w-7xl mx-auto px-8 py-10">
            {/* Dynamic Grid */}
            <div
              className="grid gap-8"
              style={{ gridTemplateColumns: `repeat(${totalColumns}, minmax(0, 1fr))` }}
            >
              {/* Link Columns */}
              {columns.map((column, index) => (
                <div key={index} className="min-w-0">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4 pb-2 border-b border-gray-100">
                    {column.title}
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          to={link.path}
                          onClick={handleClose}
                          className={`text-sm transition-colors block ${
                            link.isHighlighted
                              ? 'text-red-600 font-medium hover:text-red-700'
                              : 'text-gray-700 hover:text-gray-900 hover:translate-x-1 transition-transform'
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Two Featured Images */}
              {randomImages.length >= 2 ? (
                <>
                  <Link
                    to={`/product/${randomImages[0].id}`}
                    onClick={handleClose}
                    className="group relative overflow-hidden aspect-[3/4] bg-gray-50"
                  >
                    <img
                      src={randomImages[0].image}
                      alt={randomImages[0].name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform">
                      <p className="text-white text-xs font-medium line-clamp-2">{randomImages[0].name}</p>
                    </div>
                  </Link>

                  <Link
                    to={`/product/${randomImages[1].id}`}
                    onClick={handleClose}
                    className="group relative overflow-hidden aspect-[3/4] bg-gray-50"
                  >
                    <img
                      src={randomImages[1].image}
                      alt={randomImages[1].name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform">
                      <p className="text-white text-xs font-medium line-clamp-2">{randomImages[1].name}</p>
                    </div>
                  </Link>
                </>
              ) : (
                /* Fallback for categories without image data */
                <>
                  <Link
                    to={`/category/${categorySlug}`}
                    onClick={handleClose}
                    className="relative overflow-hidden aspect-[3/4] bg-gray-100 flex items-center justify-center"
                  >
                    <span className="text-gray-400 text-sm">Shop {title}</span>
                  </Link>
                  <Link
                    to={`/category/${categorySlug}`}
                    onClick={handleClose}
                    className="relative overflow-hidden aspect-[3/4] bg-gray-100 flex items-center justify-center"
                  >
                    <span className="text-gray-400 text-sm">Explore {title}</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
