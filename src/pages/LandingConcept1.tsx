import { useNavigate } from 'react-router-dom';
import HeroCarousel from '@/components/landing/HeroCarousel';
import QuoteSection from '@/components/landing/QuoteSection';
import FlashSaleSection from '@/components/landing/FlashSaleSection';
import TrendingSection from '@/components/landing/TrendingSection';
import InteriorStylesSection from '@/components/landing/InteriorStylesSection';
import LightingShowcase from '@/components/landing/LightingShowcase';
import ValuesSection from '@/components/landing/ValuesSection';

import { ImageGrid, type ImageGridItem, Box, VideoHero, type ProductCardProps } from '@/design-system';

import trendingData from '@/data/trending.json';
import furnitureimage from '@/assets/furniture/sofa/sofa-1.jpg'
import rugimage from '@/assets/rugs/rug-7.jpeg'
import lightimage from '@/assets/lighting/floor-lamps/floor-lamp-5.jpeg'
import heroVideo from '@/assets/videos/light.mp4'

// Import trending product images (furniture from subfolders and rugs)
import trending1 from '@/assets/furniture/sofa/sofa-1.jpg'
import trending2 from '@/assets/rugs/rug-1.jpeg'
import trending3 from '@/assets/furniture/sofa/sofa-2.jpg'
import trending4 from '@/assets/rugs/rug-2.jpeg'
import trending5 from '@/assets/furniture/accent chairs/accent-chair-1.jpg'
import trending6 from '@/assets/rugs/rug-3.jpeg'
import trending7 from '@/assets/furniture/accent chairs/accent-chair-2.jpg'
import trending8 from '@/assets/rugs/rug-4.jpeg'
import trending9 from '@/assets/furniture/coffee table/coffee-table-1.jpg'
import trending10 from '@/assets/rugs/rug-5.jpeg'
import trending11 from '@/assets/furniture/coffee table/coffee-table-2.jpg'
import trending12 from '@/assets/rugs/rug-6.jpeg'
import trending13 from '@/assets/furniture/tvstand/tv-stand-1.jpg'
import trending14 from '@/assets/rugs/rug-7.jpeg'
import trending15 from '@/assets/furniture/tvstand/tv-stand-2.jpg'
import trending16 from '@/assets/rugs/rug-8.jpeg'
import trending17 from '@/assets/furniture/sofa/sofa-3.jpg'
import trending18 from '@/assets/rugs/rug-9.jpeg'
import trending19 from '@/assets/furniture/accent chairs/accent-chair-3.jpg'
import trending20 from '@/assets/rugs/rug-10.jpeg'

import { InstagramPromo } from '@/design-system';

// Import promotion images
import promo1 from '@/assets/promotion/andres-jasso-ssbgw3cKdXg-unsplash.jpg';
import promo2 from '@/assets/promotion/ellen-qin-bxLhqZIp2LI-unsplash.jpg';
import promo3 from '@/assets/promotion/kara-eads-buhmhprfo3g-unsplash.jpg';
import promo4 from '@/assets/promotion/virender-singh-hE0nmTffKtM-unsplash.jpg';

// Map trending images
const trendingImages: { [key: string]: string } = {
  'trending-1': trending1,
  'trending-2': trending2,
  'trending-3': trending3,
  'trending-4': trending4,
  'trending-5': trending5,
  'trending-6': trending6,
  'trending-7': trending7,
  'trending-8': trending8,
  'trending-9': trending9,
  'trending-10': trending10,
  'trending-11': trending11,
  'trending-12': trending12,
  'trending-13': trending13,
  'trending-14': trending14,
  'trending-15': trending15,
  'trending-16': trending16,
  'trending-17': trending17,
  'trending-18': trending18,
  'trending-19': trending19,
  'trending-20': trending20,
};

export default function LandingConcept1() {
  const navigate = useNavigate();

  // Map trending products with images - use productId for navigation to actual product pages
  const trendingProducts: ProductCardProps[] = trendingData.map((product) => ({
    id: (product as { productId?: string }).productId || product.id,
    name: product.name,
    price: product.price,
    image: trendingImages[product.id],
    colors: product.colors,
    badge: product.badge
  }));

  const categoryImages: ImageGridItem[] = [
    {
      id: 'furniture',
      src: furnitureimage,
      alt: 'Furniture',
      text: 'Furniture',
      buttonText: '',
      onClick: () => navigate('/category/furniture'),
      aspectRatio: '2/3'
    },
    {
      id: 'rugs',
      src: rugimage,
      alt: 'Rugs',
      text: 'Rugs',
      buttonText: '',
      onClick: () => navigate('/category/rugs'),
      aspectRatio: '2/3'
    },
    {
      id: 'lighting',
      src: lightimage,
      alt: 'Lighting',
      text: 'Lighting',
      buttonText: '',
      onClick: () => navigate('/category/lighting'),
      aspectRatio: '2/3'
    },
   
  ];

  return (
    <Box sx={{ position: 'relative', minH: 'screen', bg: 'bg-white' }} style={{ marginTop: '-100px' }}>
      {/* HERO CAROUSEL */}
      <HeroCarousel />

      {/* QUOTE SECTION */}
      <QuoteSection quote="We believe great design begins with intention, care, and respect for the spaces we live in." />

      {/* CATEGORY IMAGE GRID */}
      <Box sx={{ w: 'full', px: { base: 4, md: 6 }, py: 1 }}>
        <ImageGrid
          items={categoryImages}
          columns={{ base: 1, sm: 3, md: 3, lg: 3 }}
          gap={4}
        />
      </Box>

      {/* FLASH SALE SECTION */}
      <FlashSaleSection
        title="FLASH SALE : UP TO 40% OFF!"
        endTime={new Date(Date.now() + 2 * 60 * 60 * 1000)} // 2 hours from now
        buttonText="SHOP CLEARANCE"
        onButtonClick={() => navigate('/products?sale=10-20,20-30,30-40,40%2B')}
      />

      {/* VIDEO HERO */}
      <VideoHero
        src={heroVideo}
        text="Experience Luxury Living"
        buttonText="Explore Collection"
        onButtonClick={() => navigate('/products')}
        height="70vh"
      />

      {/* TRENDING SECTION */}
      <TrendingSection
        title="TRENDING NOW"
        subtitle="Most Popular This Week"
        products={trendingProducts}
      />

      {/* INTERIOR DESIGN STYLES */}
      <InteriorStylesSection />

      {/* LIGHTING SHOWCASE */}
      <LightingShowcase />

      {/* VALUES SECTION */}
      <ValuesSection />

      {/* INSTAGRAM PROMOTION */}
       <InstagramPromo
      images={[promo1, promo2, promo3, promo4]}
      instagramHandle="@gaidecor"
      imageHeight="400px"
    />


    </Box>
  );
}
