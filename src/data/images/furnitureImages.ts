// Central furniture image mapping - 40 products across 4 categories

// Sofas (10)
import sofa1 from '@/assets/furniture/sofa/sofa-1.jpg';
import sofa2 from '@/assets/furniture/sofa/sofa-2.jpg';
import sofa3 from '@/assets/furniture/sofa/sofa-3.jpg';
import sofa4 from '@/assets/furniture/sofa/sofa-4.jpg';
import sofa5 from '@/assets/furniture/sofa/sofa-5.jpg';
import sofa6 from '@/assets/furniture/sofa/sofa-6.jpg';
import sofa7 from '@/assets/furniture/sofa/sofa-7.jpg';
import sofa8 from '@/assets/furniture/sofa/sofa-8.jpg';
import sofa9 from '@/assets/furniture/sofa/sofa-9.jpg';
import sofa10 from '@/assets/furniture/sofa/sofa-10.jpg';

// Accent Chairs (10)
import accentChair1 from '@/assets/furniture/accent chairs/accent-chair-1.jpg';
import accentChair2 from '@/assets/furniture/accent chairs/accent-chair-2.jpg';
import accentChair3 from '@/assets/furniture/accent chairs/accent-chair-3.jpg';
import accentChair4 from '@/assets/furniture/accent chairs/accent-chair-4.jpg';
import accentChair5 from '@/assets/furniture/accent chairs/accent-chair-5.jpg';
import accentChair6 from '@/assets/furniture/accent chairs/accent-chair-6.jpg';
import accentChair7 from '@/assets/furniture/accent chairs/accent-chair-7.jpg';
import accentChair8 from '@/assets/furniture/accent chairs/accent-chair-8.jpg';
import accentChair9 from '@/assets/furniture/accent chairs/accent-chair-9.jpg';
import accentChair10 from '@/assets/furniture/accent chairs/accent-chair-10.jpg';

// Coffee Tables (10)
import coffeeTable1 from '@/assets/furniture/coffee table/coffee-table-1.jpg';
import coffeeTable2 from '@/assets/furniture/coffee table/coffee-table-2.jpg';
import coffeeTable3 from '@/assets/furniture/coffee table/coffee-table-3.jpg';
import coffeeTable4 from '@/assets/furniture/coffee table/coffee-table-4.jpg';
import coffeeTable5 from '@/assets/furniture/coffee table/coffee-table-5.jpg';
import coffeeTable6 from '@/assets/furniture/coffee table/coffee-table-6.jpg';
import coffeeTable7 from '@/assets/furniture/coffee table/coffee-table-7.jpg';
import coffeeTable8 from '@/assets/furniture/coffee table/coffee-table-8.jpg';
import coffeeTable9 from '@/assets/furniture/coffee table/coffee-table-9.jpg';
import coffeeTable10 from '@/assets/furniture/coffee table/coffee-table-10.jpg';

// TV Stands (10)
import tvStand1 from '@/assets/furniture/tvstand/tv-stand-1.jpg';
import tvStand2 from '@/assets/furniture/tvstand/tv-stand-2.jpg';
import tvStand3 from '@/assets/furniture/tvstand/tv-stand-3.jpg';
import tvStand4 from '@/assets/furniture/tvstand/tv-stand-4.jpg';
import tvStand5 from '@/assets/furniture/tvstand/tv-stand-5.jpg';
import tvStand6 from '@/assets/furniture/tvstand/tv-stand-6.jpg';
import tvStand7 from '@/assets/furniture/tvstand/tv-stand-7.webp';
import tvStand8 from '@/assets/furniture/tvstand/tv-stand-8.jpg';
import tvStand9 from '@/assets/furniture/tvstand/tv-stand-9.webp';
import tvStand10 from '@/assets/furniture/tvstand/tv-stand-10.webp';

// Map by filename for JSON data
export const furnitureImagesByFilename: Record<string, string> = {
  // Sofas
  'sofa-1.jpg': sofa1,
  'sofa-2.jpg': sofa2,
  'sofa-3.jpg': sofa3,
  'sofa-4.jpg': sofa4,
  'sofa-5.jpg': sofa5,
  'sofa-6.jpg': sofa6,
  'sofa-7.jpg': sofa7,
  'sofa-8.jpg': sofa8,
  'sofa-9.jpg': sofa9,
  'sofa-10.jpg': sofa10,

  // Accent Chairs
  'accent-chair-1.jpg': accentChair1,
  'accent-chair-2.jpg': accentChair2,
  'accent-chair-3.jpg': accentChair3,
  'accent-chair-4.jpg': accentChair4,
  'accent-chair-5.jpg': accentChair5,
  'accent-chair-6.jpg': accentChair6,
  'accent-chair-7.jpg': accentChair7,
  'accent-chair-8.jpg': accentChair8,
  'accent-chair-9.jpg': accentChair9,
  'accent-chair-10.jpg': accentChair10,

  // Coffee Tables
  'coffee-table-1.jpg': coffeeTable1,
  'coffee-table-2.jpg': coffeeTable2,
  'coffee-table-3.jpg': coffeeTable3,
  'coffee-table-4.jpg': coffeeTable4,
  'coffee-table-5.jpg': coffeeTable5,
  'coffee-table-6.jpg': coffeeTable6,
  'coffee-table-7.jpg': coffeeTable7,
  'coffee-table-8.jpg': coffeeTable8,
  'coffee-table-9.jpg': coffeeTable9,
  'coffee-table-10.jpg': coffeeTable10,

  // TV Stands
  'tv-stand-1.jpg': tvStand1,
  'tv-stand-2.jpg': tvStand2,
  'tv-stand-3.jpg': tvStand3,
  'tv-stand-4.jpg': tvStand4,
  'tv-stand-5.jpg': tvStand5,
  'tv-stand-6.jpg': tvStand6,
  'tv-stand-7.webp': tvStand7,
  'tv-stand-8.jpg': tvStand8,
  'tv-stand-9.webp': tvStand9,
  'tv-stand-10.webp': tvStand10,
};

// Helper function to get image by filename
export function getFurnitureImage(filename: string): string | undefined {
  return furnitureImagesByFilename[filename];
}
