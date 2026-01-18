// Central image mapping for Decor category
// This file imports all decor images once and provides a lookup function

// Vases (5 images)
import vase1 from '@/assets/decor/vases/vase-1.jpeg';
import vase2 from '@/assets/decor/vases/vase-2.jpeg';
import vase3 from '@/assets/decor/vases/vase-3.jpeg';
import vase4 from '@/assets/decor/vases/vase-4.jpeg';
import vase5 from '@/assets/decor/vases/vase-5.jpeg';

// Candles (4 images)
import candle1 from '@/assets/decor/candles/candle-1.jpeg';
import candle2 from '@/assets/decor/candles/candle-2.jpeg';
import candle3 from '@/assets/decor/candles/candle-3.jpeg';
import candle4 from '@/assets/decor/candles/candle-4.jpeg';

// Decorative Objects (6 images)
import object1 from '@/assets/decor/decorative-objects/object-1.jpeg';
import object2 from '@/assets/decor/decorative-objects/object-2.jpeg';
import object3 from '@/assets/decor/decorative-objects/object-3.jpeg';
import object4 from '@/assets/decor/decorative-objects/object-4.jpeg';
import object5 from '@/assets/decor/decorative-objects/object-5.jpeg';
import object6 from '@/assets/decor/decorative-objects/object-6.jpeg';

// Throw Pillows (4 images)
import pillow1 from '@/assets/decor/throw-pillows/pillow-1.jpeg';
import pillow2 from '@/assets/decor/throw-pillows/pillow-2.jpeg';
import pillow3 from '@/assets/decor/throw-pillows/pillow-3.jpeg';
import pillow4 from '@/assets/decor/throw-pillows/pillow-4.jpeg';

// Image mapping by filename
export const decorImagesByFilename: Record<string, string> = {
  // Vases
  'vase-1.jpeg': vase1,
  'vase-2.jpeg': vase2,
  'vase-3.jpeg': vase3,
  'vase-4.jpeg': vase4,
  'vase-5.jpeg': vase5,
  // Candles
  'candle-1.jpeg': candle1,
  'candle-2.jpeg': candle2,
  'candle-3.jpeg': candle3,
  'candle-4.jpeg': candle4,
  // Decorative Objects
  'object-1.jpeg': object1,
  'object-2.jpeg': object2,
  'object-3.jpeg': object3,
  'object-4.jpeg': object4,
  'object-5.jpeg': object5,
  'object-6.jpeg': object6,
  // Throw Pillows
  'pillow-1.jpeg': pillow1,
  'pillow-2.jpeg': pillow2,
  'pillow-3.jpeg': pillow3,
  'pillow-4.jpeg': pillow4,
};

// Helper function to get decor image by filename
export function getDecorImage(filename: string): string {
  return decorImagesByFilename[filename] || '';
}
