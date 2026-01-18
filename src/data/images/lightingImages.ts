// Central lighting image mapping - 34 products across 4 categories

// Ceiling Lights (8)
import ceilingLight1 from '@/assets/lighting/ceiling-lights/ceiling-light-1.jpeg';
import ceilingLight2 from '@/assets/lighting/ceiling-lights/ceiling-light-2.jpeg';
import ceilingLight3 from '@/assets/lighting/ceiling-lights/ceiling-light-3.jpeg';
import ceilingLight4 from '@/assets/lighting/ceiling-lights/ceiling-light-4.jpg';
import ceilingLight5 from '@/assets/lighting/ceiling-lights/ceiling-light-5.jpg';
import ceilingLight6 from '@/assets/lighting/ceiling-lights/ceiling-light-6.jpg';
import ceilingLight7 from '@/assets/lighting/ceiling-lights/ceiling-light-7.jpg';
import ceilingLight8 from '@/assets/lighting/ceiling-lights/ceiling-light-8.jpg';

// Floor Lamps (9)
import floorLamp1 from '@/assets/lighting/floor-lamps/floor-lamp-1.jpeg';
import floorLamp2 from '@/assets/lighting/floor-lamps/floor-lamp-2.jpeg';
import floorLamp3 from '@/assets/lighting/floor-lamps/floor-lamp-3.jpeg';
import floorLamp4 from '@/assets/lighting/floor-lamps/floor-lamp-4.jpeg';
import floorLamp5 from '@/assets/lighting/floor-lamps/floor-lamp-5.jpeg';
import floorLamp6 from '@/assets/lighting/floor-lamps/floor-lamp-6.jpg';
import floorLamp7 from '@/assets/lighting/floor-lamps/floor-lamp-7.jpg';
import floorLamp8 from '@/assets/lighting/floor-lamps/floor-lamp-8.jpg';
import floorLamp9 from '@/assets/lighting/floor-lamps/floor-lamp-9.jpg';

// Table Lamps (9)
import tableLamp1 from '@/assets/lighting/table-lamps/table-lamp-1.jpeg';
import tableLamp2 from '@/assets/lighting/table-lamps/table-lamp-2.jpeg';
import tableLamp3 from '@/assets/lighting/table-lamps/table-lamp-3.jpeg';
import tableLamp4 from '@/assets/lighting/table-lamps/table-lamp-4.jpeg';
import tableLamp5 from '@/assets/lighting/table-lamps/table-lamp-5.jpeg';
import tableLamp6 from '@/assets/lighting/table-lamps/table-lamp-6.jpg';
import tableLamp7 from '@/assets/lighting/table-lamps/table-lamp-7.jpg';
import tableLamp8 from '@/assets/lighting/table-lamps/table-lamp-8.jpg';
import tableLamp9 from '@/assets/lighting/table-lamps/table-lamp-9.jpg';

// Wall Sconces (8)
import wallSconce1 from '@/assets/lighting/wall-sconces/wall-sconce-1.jpeg';
import wallSconce2 from '@/assets/lighting/wall-sconces/wall-sconce-2.jpeg';
import wallSconce3 from '@/assets/lighting/wall-sconces/wall-sconce-3.jpeg';
import wallSconce4 from '@/assets/lighting/wall-sconces/wall-sconce-4.jpeg';
import wallSconce5 from '@/assets/lighting/wall-sconces/wall-sconce-5.jpeg';
import wallSconce6 from '@/assets/lighting/wall-sconces/wall-sconce-6.jpeg';
import wallSconce7 from '@/assets/lighting/wall-sconces/wall-sconce-7.jpg';
import wallSconce8 from '@/assets/lighting/wall-sconces/wall-sconce-8.jpg';

// Map by filename for JSON data
export const lightingImagesByFilename: Record<string, string> = {
  // Ceiling Lights
  'ceiling-light-1.jpeg': ceilingLight1,
  'ceiling-light-2.jpeg': ceilingLight2,
  'ceiling-light-3.jpeg': ceilingLight3,
  'ceiling-light-4.jpg': ceilingLight4,
  'ceiling-light-5.jpg': ceilingLight5,
  'ceiling-light-6.jpg': ceilingLight6,
  'ceiling-light-7.jpg': ceilingLight7,
  'ceiling-light-8.jpg': ceilingLight8,

  // Floor Lamps
  'floor-lamp-1.jpeg': floorLamp1,
  'floor-lamp-2.jpeg': floorLamp2,
  'floor-lamp-3.jpeg': floorLamp3,
  'floor-lamp-4.jpeg': floorLamp4,
  'floor-lamp-5.jpeg': floorLamp5,
  'floor-lamp-6.jpg': floorLamp6,
  'floor-lamp-7.jpg': floorLamp7,
  'floor-lamp-8.jpg': floorLamp8,
  'floor-lamp-9.jpg': floorLamp9,

  // Table Lamps
  'table-lamp-1.jpeg': tableLamp1,
  'table-lamp-2.jpeg': tableLamp2,
  'table-lamp-3.jpeg': tableLamp3,
  'table-lamp-4.jpeg': tableLamp4,
  'table-lamp-5.jpeg': tableLamp5,
  'table-lamp-6.jpg': tableLamp6,
  'table-lamp-7.jpg': tableLamp7,
  'table-lamp-8.jpg': tableLamp8,
  'table-lamp-9.jpg': tableLamp9,

  // Wall Sconces
  'wall-sconce-1.jpeg': wallSconce1,
  'wall-sconce-2.jpeg': wallSconce2,
  'wall-sconce-3.jpeg': wallSconce3,
  'wall-sconce-4.jpeg': wallSconce4,
  'wall-sconce-5.jpeg': wallSconce5,
  'wall-sconce-6.jpeg': wallSconce6,
  'wall-sconce-7.jpg': wallSconce7,
  'wall-sconce-8.jpg': wallSconce8,
};

// Helper function to get image by filename
export function getLightingImage(filename: string): string | undefined {
  return lightingImagesByFilename[filename];
}
