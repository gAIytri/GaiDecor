// Central rugs image mapping - 25 products across 4 categories

// Indoor Rugs (7)
import rug1 from '@/assets/rugs/rug-1.jpeg';
import rug2 from '@/assets/rugs/rug-2.jpeg';
import rug3 from '@/assets/rugs/rug-3.jpeg';
import rug4 from '@/assets/rugs/rug-4.jpeg';
import rug5 from '@/assets/rugs/rug-5.jpeg';
import rug6 from '@/assets/rugs/rug-6.jpeg';
import rug7 from '@/assets/rugs/rug-7.jpeg';

// Indoor/Outdoor Rugs (6)
import rug8 from '@/assets/rugs/rug-8.jpeg';
import rug9 from '@/assets/rugs/rug-9.jpeg';
import rug10 from '@/assets/rugs/rug-10.jpeg';
import rug11 from '@/assets/rugs/rug-11.jpeg';
import rug12 from '@/assets/rugs/rug-12.jpeg';
import rug13 from '@/assets/rugs/rug-13.jpeg';

// Reversible Rugs (6)
import rug14 from '@/assets/rugs/rug-14.jpeg';
import rug15 from '@/assets/rugs/rug-15.jpeg';
import rug16 from '@/assets/rugs/rug-16.jpeg';
import rug17 from '@/assets/rugs/rug-17.jpeg';
import rug18 from '@/assets/rugs/rug-18.jpeg';
import rug19 from '@/assets/rugs/rug-19.jpg';

// Natural Fiber Rugs (6)
import rug20 from '@/assets/rugs/rug-20.jpg';
import rug21 from '@/assets/rugs/rug-21.jpg';
import rug22 from '@/assets/rugs/rug-22.jpg';
import rug23 from '@/assets/rugs/rug-23.jpg';
import rug24 from '@/assets/rugs/rug-24.jpg';
import rug25 from '@/assets/rugs/rug-25.jpg';

// Map by filename for JSON data
export const rugsImagesByFilename: Record<string, string> = {
  // Indoor Rugs
  'rug-1.jpeg': rug1,
  'rug-2.jpeg': rug2,
  'rug-3.jpeg': rug3,
  'rug-4.jpeg': rug4,
  'rug-5.jpeg': rug5,
  'rug-6.jpeg': rug6,
  'rug-7.jpeg': rug7,

  // Indoor/Outdoor Rugs
  'rug-8.jpeg': rug8,
  'rug-9.jpeg': rug9,
  'rug-10.jpeg': rug10,
  'rug-11.jpeg': rug11,
  'rug-12.jpeg': rug12,
  'rug-13.jpeg': rug13,

  // Reversible Rugs
  'rug-14.jpeg': rug14,
  'rug-15.jpeg': rug15,
  'rug-16.jpeg': rug16,
  'rug-17.jpeg': rug17,
  'rug-18.jpeg': rug18,
  'rug-19.jpg': rug19,

  // Natural Fiber Rugs
  'rug-20.jpg': rug20,
  'rug-21.jpg': rug21,
  'rug-22.jpg': rug22,
  'rug-23.jpg': rug23,
  'rug-24.jpg': rug24,
  'rug-25.jpg': rug25,
};

// Helper function to get image by filename
export function getRugImage(filename: string): string | undefined {
  return rugsImagesByFilename[filename];
}
