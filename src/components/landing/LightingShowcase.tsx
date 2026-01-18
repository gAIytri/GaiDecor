/**
 * LightingShowcase Component
 * Full-width video hero with stacked product cards for lighting collection
 */

import { useState } from 'react';
import { MediaHeroWithCard, type MediaHeroProduct } from '@/design-system';
import lightingVideo from '@/assets/videos/lightingscard.mp4';
import lightingData from '@/data/lighting.json';
import { lightingImagesByFilename } from '@/data/images';

// Color mapping for lighting products
const colorMap: { [key: string]: string } = {
  gold: '#FFD700',
  crystal: '#E8E8E8',
  white: '#FFFFFF',
  black: '#000000',
  brass: '#B5A642',
  silver: '#C0C0C0',
  bronze: '#CD7F32',
  chrome: '#E5E4E2',
  copper: '#B87333',
  'matte black': '#28282B',
  nickel: '#B8B8B8',
  wood: '#8B4513',
  marble: '#F5F5DC',
  fabric: '#DCDCDC',
  natural: '#D2B48C',
  beige: '#F5F5DC',
  gray: '#808080',
  green: '#228B22',
  blue: '#4169E1',
  purple: '#9370DB',
  clear: '#E8E8E8',
};

// Lighting product interface (new schema)
interface LightingProduct {
  id: string;
  name: string;
  price: number;
  primaryImage: string;
  attributes: {
    color?: string[];
  };
  metadata: {
    featured?: boolean;
    bestSeller?: boolean;
  };
}

export default function LightingShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter products to only those with imported images and are featured/best sellers
  const availableProducts = (lightingData as LightingProduct[]).filter(
    (product) => lightingImagesByFilename[product.primaryImage] &&
                 (product.metadata.featured || product.metadata.bestSeller)
  );

  // Fallback if no featured products
  const productsToShow = availableProducts.length > 0
    ? availableProducts
    : (lightingData as LightingProduct[]).filter(p => lightingImagesByFilename[p.primaryImage]).slice(0, 8);

  // Map current product to MediaHeroProduct format
  const currentProduct = productsToShow[currentIndex];
  const product: MediaHeroProduct = {
    image: lightingImagesByFilename[currentProduct.primaryImage],
    name: currentProduct.name,
    price: currentProduct.price,
    colors: currentProduct.attributes.color?.map((color) => colorMap[color.toLowerCase()] || '#CCCCCC'),
    moreColorsCount: currentProduct.attributes.color && currentProduct.attributes.color.length > 4
      ? currentProduct.attributes.color.length - 4
      : 0,
    productId: currentProduct.id,
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? productsToShow.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === productsToShow.length - 1 ? 0 : prev + 1));
  };

  return (
    <MediaHeroWithCard
      backgroundType="video"
      backgroundSrc={lightingVideo}
      label="LIGHTING COLLECTION"
      heading="Illuminate Your Space"
      description="Discover our curated collection of modern lighting fixtures. From statement chandeliers to minimalist floor lamps."
      product={product}
      showNavigation={true}
      onPrevious={handlePrevious}
      onNext={handleNext}
      height="700px"
      overlayOpacity={0.4}
    />
  );
}
