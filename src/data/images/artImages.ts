// Central image mapping for Art & Mirrors category
// This file imports all art images once and provides a lookup function

// Wall Art (9 images)
import art1 from '@/assets/art/wall-art/art-1.jpeg';
import art2 from '@/assets/art/wall-art/art-2.jpeg';
import art3 from '@/assets/art/wall-art/art-3.jpeg';
import art4 from '@/assets/art/wall-art/art-4.jpeg';
import art5 from '@/assets/art/wall-art/art-5.jpeg';
import art6 from '@/assets/art/wall-art/art-6.jpg';
import art7 from '@/assets/art/wall-art/art-7.jpg';
import art8 from '@/assets/art/wall-art/art-8.jpg';
import art9 from '@/assets/art/wall-art/art-9.jpg';

// Mirrors (10 images)
import mirror1 from '@/assets/art/mirrors/mirror-1.jpeg';
import mirror2 from '@/assets/art/mirrors/mirror-2.jpg';
import mirror3 from '@/assets/art/mirrors/mirror-3.jpeg';
import mirror4 from '@/assets/art/mirrors/mirror-4.jpeg';
import mirror5 from '@/assets/art/mirrors/mirror-5.jpg';
import mirror6 from '@/assets/art/mirrors/mirror-6.webp';
import mirror7 from '@/assets/art/mirrors/mirror-7.webp';
import mirror8 from '@/assets/art/mirrors/mirror-8.webp';
import mirror9 from '@/assets/art/mirrors/mirror-9.webp';
import mirror10 from '@/assets/art/mirrors/mirror-10.webp';

// Image mapping by filename
export const artImagesByFilename: Record<string, string> = {
  // Wall Art
  'art-1.jpeg': art1,
  'art-2.jpeg': art2,
  'art-3.jpeg': art3,
  'art-4.jpeg': art4,
  'art-5.jpeg': art5,
  'art-6.jpg': art6,
  'art-7.jpg': art7,
  'art-8.jpg': art8,
  'art-9.jpg': art9,
  // Mirrors
  'mirror-1.jpeg': mirror1,
  'mirror-2.jpg': mirror2,
  'mirror-3.jpeg': mirror3,
  'mirror-4.jpeg': mirror4,
  'mirror-5.jpg': mirror5,
  'mirror-6.webp': mirror6,
  'mirror-7.webp': mirror7,
  'mirror-8.webp': mirror8,
  'mirror-9.webp': mirror9,
  'mirror-10.webp': mirror10,
};

// Helper function to get art image by filename
export function getArtImage(filename: string): string {
  return artImagesByFilename[filename] || '';
}
