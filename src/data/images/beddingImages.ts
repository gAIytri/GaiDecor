// Central image mapping for Bedding category
// This file imports all bedding images once and provides a lookup function

// Bedding Sets (6 images)
import bedding1 from '@/assets/bedding/bedding-sets/bedding-1.jpeg';
import bedding2 from '@/assets/bedding/bedding-sets/bedding-2.jpeg';
import bedding3 from '@/assets/bedding/bedding-sets/bedding-3.jpeg';
import bedding4 from '@/assets/bedding/bedding-sets/bedding-4.jpeg';
import bedding5 from '@/assets/bedding/bedding-sets/bedding-5.jpeg';
import bedding6 from '@/assets/bedding/bedding-sets/bedding-6.jpeg';

// Curtains (5 images)
import curtain1 from '@/assets/bedding/curtains/curtain-1.jpeg';
import curtain2 from '@/assets/bedding/curtains/curtain-2.jpeg';
import curtain3 from '@/assets/bedding/curtains/curtain-3.jpeg';
import curtain4 from '@/assets/bedding/curtains/curtain-4.jpeg';
import curtain5 from '@/assets/bedding/curtains/curtain-5.jpeg';

// Throw Blankets (4 images)
import blanket1 from '@/assets/bedding/throw-blankets/blanket-1.jpeg';
import blanket2 from '@/assets/bedding/throw-blankets/blanket-2.jpeg';
import blanket3 from '@/assets/bedding/throw-blankets/blanket-3.jpeg';
import blanket4 from '@/assets/bedding/throw-blankets/blanket-4.jpeg';

// Image mapping by filename
export const beddingImagesByFilename: Record<string, string> = {
  // Bedding Sets
  'bedding-1.jpeg': bedding1,
  'bedding-2.jpeg': bedding2,
  'bedding-3.jpeg': bedding3,
  'bedding-4.jpeg': bedding4,
  'bedding-5.jpeg': bedding5,
  'bedding-6.jpeg': bedding6,
  // Curtains
  'curtain-1.jpeg': curtain1,
  'curtain-2.jpeg': curtain2,
  'curtain-3.jpeg': curtain3,
  'curtain-4.jpeg': curtain4,
  'curtain-5.jpeg': curtain5,
  // Throw Blankets
  'blanket-1.jpeg': blanket1,
  'blanket-2.jpeg': blanket2,
  'blanket-3.jpeg': blanket3,
  'blanket-4.jpeg': blanket4,
};

// Helper function to get bedding image by filename
export function getBeddingImage(filename: string): string {
  return beddingImagesByFilename[filename] || '';
}
