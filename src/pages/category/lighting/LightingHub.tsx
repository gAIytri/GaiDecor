import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import subcategory images
import ceilingLight1 from '@/assets/lighting/ceiling-lights/ceiling-light-1.jpeg';
import ceilingLight2 from '@/assets/lighting/ceiling-lights/ceiling-light-2.jpeg';
import ceilingLight3 from '@/assets/lighting/ceiling-lights/ceiling-light-3.jpeg';
import ceilingLight4 from '@/assets/lighting/ceiling-lights/ceiling-light-4.jpg';
import ceilingLight5 from '@/assets/lighting/ceiling-lights/ceiling-light-5.jpg';

import floorLamp1 from '@/assets/lighting/floor-lamps/floor-lamp-1.jpeg';
import floorLamp2 from '@/assets/lighting/floor-lamps/floor-lamp-2.jpeg';
import floorLamp3 from '@/assets/lighting/floor-lamps/floor-lamp-3.jpeg';
import floorLamp4 from '@/assets/lighting/floor-lamps/floor-lamp-4.jpeg';
import floorLamp5 from '@/assets/lighting/floor-lamps/floor-lamp-5.jpeg';

import tableLamp1 from '@/assets/lighting/table-lamps/table-lamp-1.jpeg';
import tableLamp2 from '@/assets/lighting/table-lamps/table-lamp-2.jpeg';
import tableLamp3 from '@/assets/lighting/table-lamps/table-lamp-3.jpeg';
import tableLamp4 from '@/assets/lighting/table-lamps/table-lamp-4.jpeg';
import tableLamp5 from '@/assets/lighting/table-lamps/table-lamp-5.jpeg';

import wallSconce1 from '@/assets/lighting/wall-sconces/wall-sconce-1.jpeg';
import wallSconce2 from '@/assets/lighting/wall-sconces/wall-sconce-2.jpeg';
import wallSconce3 from '@/assets/lighting/wall-sconces/wall-sconce-3.jpeg';
import wallSconce4 from '@/assets/lighting/wall-sconces/wall-sconce-4.jpeg';
import wallSconce5 from '@/assets/lighting/wall-sconces/wall-sconce-5.jpeg';
import wallSconce6 from '@/assets/lighting/wall-sconces/wall-sconce-6.jpeg';

// Hero images for horizontal scroll
const heroImages = [ceilingLight2, floorLamp3, tableLamp1, wallSconce4];

// Subcategory images mapping
const subcategoryImages: Record<string, string[]> = {
  'ceiling-lights': [ceilingLight1, ceilingLight2, ceilingLight3, ceilingLight4, ceilingLight5],
  'floor-lamps': [floorLamp1, floorLamp2, floorLamp3, floorLamp4, floorLamp5],
  'table-lamps': [tableLamp1, tableLamp2, tableLamp3, tableLamp4, tableLamp5],
  'wall-sconces': [wallSconce1, wallSconce2, wallSconce3, wallSconce4, wallSconce5, wallSconce6],
};

export default function LightingHub() {
  // Get unique subcategories - using productType slug for URL params
  const subcategories = [
    {
      name: 'Ceiling Lights',
      slug: 'ceiling-light',
      description: 'Chandeliers, Pendants & Flush Mounts',
      images: subcategoryImages['ceiling-lights']
    },
    {
      name: 'Floor Lamps',
      slug: 'floor-lamp',
      description: 'Arc, Tripod & Task Lamps',
      images: subcategoryImages['floor-lamps']
    },
    {
      name: 'Table Lamps',
      slug: 'table-lamp',
      description: 'Desk & Accent Lamps',
      images: subcategoryImages['table-lamps']
    },
    {
      name: 'Wall Sconces',
      slug: 'wall-sconce',
      description: 'Modern & Vintage Wall Lights',
      images: subcategoryImages['wall-sconces']
    }
  ];

  return (
    <div className="relative min-h-screen bg-white -mt-14 pt-14">
      {/* HERO - Horizontal Auto-Scrolling Images (400px) */}
      <div className="relative h-[600px] w-full overflow-hidden bg-gray-900">
        {/* Scrolling Container */}
        <div className="absolute inset-0 flex animate-scroll-horizontal">
          {/* First set of images */}
          {heroImages.map((image, index) => (
            <div key={`first-${index}`} className="flex-shrink-0 w-[600px] h-full">
              <img
                src={image}
                alt={`Lighting ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {heroImages.map((image, index) => (
            <div key={`second-${index}`} className="flex-shrink-0 w-[600px] h-full">
              <img
                src={image}
                alt={`Lighting ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Hero Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl font-light mb-4 uppercase tracking-widest"
            >
              Lighting
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-white/90 max-w-2xl mx-auto"
            >
              Illuminate your space with our curated collection of ceiling lights, floor lamps, table lamps, and wall sconces
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto px-6 py-20">
        {/* Shop by Category Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-light text-gray-900 mb-4 uppercase tracking-wider">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg">
            Discover the perfect lighting for every space in your home
          </p>
        </motion.div>

        {/* Subcategory Grid - 2x2 */}
        <div className="grid grid-cols-2 gap-6 mb-24">
          {subcategories.map((subcategory, index) => (
            <motion.div
              key={subcategory.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/category/lighting?productType=${subcategory.slug}`} className="group block">
                <div className="relative aspect-[4/3] bg-white rounded-lg overflow-hidden border">
                  {/* Main Image */}
                  <img
                    src={subcategory.images[0]}
                    alt={subcategory.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Text Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <h3 className="text-2xl font-medium text-white mb-2 drop-shadow-lg">
                      {subcategory.name}
                    </h3>
                    <p className="text-sm text-white/90 drop-shadow-md">
                      {subcategory.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 4-Column Vertical Scrolling Section */}
        <div className="grid grid-cols-4 gap-6">
          {subcategories.map((subcategory, index) => (
            <motion.div
              key={subcategory.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              

              {/* Vertical Scrolling Container */}
              <div className="relative h-[700px] overflow-hidden rounded-lg bg-gray-900">
                <div className="flex flex-col animate-scroll-up-seamless">
                  {/* Original set */}
                  {subcategory.images.map((image, imgIndex) => (
                    <div key={`orig-${imgIndex}`} className="flex-shrink-0 w-full h-[300px]">
                      <img
                        src={image}
                        alt={`${subcategory.name} ${imgIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {/* Duplicate set for seamless loop */}
                  {subcategory.images.map((image, imgIndex) => (
                    <div key={`dup-${imgIndex}`} className="flex-shrink-0 w-full h-[300px]">
                      <img
                        src={image}
                        alt={`${subcategory.name} ${imgIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CSS for scroll animations */}
      <style>{`
        /* Horizontal scroll for hero */
        @keyframes scroll-horizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-2400px); /* 4 images * 600px */
          }
        }

        .animate-scroll-horizontal {
          animation: scroll-horizontal 30s linear infinite;
          will-change: transform;
        }

        .animate-scroll-horizontal:hover {
          animation-play-state: paused;
        }

        /* Vertical scroll for subcategory columns */
        @keyframes scroll-up-seamless {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        .animate-scroll-up-seamless {
          animation: scroll-up-seamless 20s linear infinite;
          will-change: transform;
        }

        .animate-scroll-up-seamless:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
