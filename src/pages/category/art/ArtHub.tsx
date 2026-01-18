import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

// Import hero images for horizontal scroll
import art1 from '@/assets/art/wall-art/art-1.jpeg';
import art2 from '@/assets/art/wall-art/art-2.jpeg';
import mirror1 from '@/assets/art/mirrors/mirror-1.jpeg';
import mirror2 from '@/assets/art/mirrors/mirror-2.jpg';

// Import all wall art images for masonry grid
import art3 from '@/assets/art/wall-art/art-3.jpeg';
import art4 from '@/assets/art/wall-art/art-4.jpeg';
import art5 from '@/assets/art/wall-art/art-5.jpeg';
import art6 from '@/assets/art/wall-art/art-6.jpg';
import art7 from '@/assets/art/wall-art/art-7.jpg';
import art8 from '@/assets/art/wall-art/art-8.jpg';
import art9 from '@/assets/art/wall-art/art-9.jpg';

// Import mirror images
import mirror3 from '@/assets/art/mirrors/mirror-3.jpeg';
import mirror4 from '@/assets/art/mirrors/mirror-4.jpeg';
import mirror5 from '@/assets/art/mirrors/mirror-4.jpeg';

const heroImages = [art1, art2, mirror1, mirror2];

// Masonry grid items with different sizes and slide directions
const masonryItems = [
  { image: art1, size: 'large', direction: 'left', label: 'Abstract Expression' },
  { image: art3, size: 'medium', direction: 'right', label: null },
  { image: art4, size: 'small', direction: 'top', label: null },
  { image: art5, size: 'tall', direction: 'bottom', label: 'Modern Canvas' },
  { image: art6, size: 'small', direction: 'left', label: null },
  { image: art7, size: 'wide', direction: 'right', label: 'Contemporary Art' },
  { image: art8, size: 'medium', direction: 'top', label: null },
  { image: art9, size: 'small', direction: 'bottom', label: null },
  { image: art2, size: 'medium', direction: 'left', label: null },
];

// Mirrors for circular arrangement
const mirrorItems = [
  { image: mirror1, delay: 0 },
  { image: mirror2, delay: 0.2 },
  { image: mirror3, delay: 0.4 },
  { image: mirror4, delay: 0.6 },
  { image: mirror5, delay: 0.8 },
];

// Direction variants for slide-in animations
const getDirectionVariant = (direction: string) => {
  const variants = {
    left: { x: -100, opacity: 0 },
    right: { x: 100, opacity: 0 },
    top: { y: -100, opacity: 0 },
    bottom: { y: 100, opacity: 0 },
  };
  return variants[direction as keyof typeof variants] || { opacity: 0 };
};

export default function ArtHub() {
  return (
    <div className="min-h-screen bg-white -mt-14 pt-14 overflow-x-hidden">
      {/* HERO SECTION - Horizontal Auto-Scrolling */}
      <div className="relative h-[600px] w-full overflow-hidden bg-gray-900">
        <div className="absolute inset-0 flex animate-scroll-horizontal">
          {/* First set */}
          {heroImages.map((image, index) => (
            <div key={`first-${index}`} className="flex-shrink-0 w-[600px] h-full">
              <img
                src={image}
                alt={`Art ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {/* Duplicate set */}
          {heroImages.map((image, index) => (
            <div key={`second-${index}`} className="flex-shrink-0 w-[600px] h-full">
              <img
                src={image}
                alt={`Art ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Hero Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center text-white px-4"
          >
            <h1 className="text-6xl font-light mb-4 uppercase tracking-widest">
              Art & Mirrors
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Where creativity meets reflection
            </p>
          </motion.div>
        </div>
      </div>

      {/* SECTION 1: MASONRY GRID - Canvas Wall Art */}
      <div className="max-w-screen-2xl mx-auto px-6 py-24">
        {/* Section Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">
            Wall Art
          </p>
          <h2 className="text-5xl font-light text-gray-900 mb-6 uppercase tracking-wider">
            The Canvas Collection
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Each piece is carefully selected to transform your walls into galleries of personal expression
          </p>
        </motion.div>

        {/* Masonry Grid - Different sized tiles sliding from different directions */}
        <div className="grid grid-cols-12 gap-4 auto-rows-[200px]">
          {masonryItems.map((item, index) => {
            // Define grid spans for different sizes
            const sizeClasses = {
              small: 'col-span-3 row-span-1',
              medium: 'col-span-4 row-span-2',
              large: 'col-span-6 row-span-2',
              tall: 'col-span-3 row-span-2',
              wide: 'col-span-6 row-span-1',
            };

            return (
              <motion.div
                key={index}
                initial={getDirectionVariant(item.direction)}
                whileInView={{ x: 0, y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 100,
                }}
                className={`${sizeClasses[item.size as keyof typeof sizeClasses]} relative group overflow-hidden rounded-lg`}
                style={{ perspective: '1000px' }}
              >
                <Link to="/category/art?productType=wall-art" className="block w-full h-full">
                  <img
                    src={item.image}
                    alt={item.label || 'Canvas Art'}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                    style={{ transformStyle: 'preserve-3d' }}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Text overlay on larger items */}
                  {item.label && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-2xl font-light tracking-wide">{item.label}</h3>
                    </div>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/category/art?productType=wall-art"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 border-b-2 border-gray-900 pb-1 hover:border-gray-600 hover:text-gray-600 transition-colors"
          >
            <span>Explore All Canvas Art</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* DIAGONAL TEXT BANNER */}
      <div className="relative h-[400px] bg-gray-900 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center text-white px-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xs font-semibold tracking-widest uppercase mb-6 text-white/70"
            >
              Transform Your Space
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-6xl md:text-7xl font-light uppercase tracking-widest mb-6"
              style={{ transform: 'rotate(-2deg)' }}
            >
              Art Transforms
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-xl text-white/90 max-w-2xl mx-auto font-light"
            >
              Every blank wall is an opportunity. Every room, a canvas waiting for its masterpiece.
            </motion.p>
          </div>
        </motion.div>

        {/* Decorative diagonal lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ transform: 'rotate(-2deg)', transformOrigin: 'left' }} />
        <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ transform: 'rotate(-2deg)', transformOrigin: 'right' }} />
      </div>

      {/* SECTION 2: MIRRORS - Circular/Radial Arrangement with Gleam */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-screen-2xl mx-auto px-6">
          {/* Section Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">
              Mirrors
            </p>
            <h2 className="text-5xl font-light text-gray-900 mb-6 uppercase tracking-wider">
              Reflections
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Mirrors that amplify light, expand space, and add dimension to your interior design
            </p>
          </motion.div>

          {/* Radial Mirror Arrangement */}
          <div className="relative h-[700px] flex items-center justify-center">
            {/* Center large mirror */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, type: 'spring' }}
              className="absolute z-10 w-[300px] h-[400px] group"
            >
              <Link to="/category/art?productType=mirror" className="block w-full h-full relative overflow-hidden rounded-lg gleam-effect">
                <img
                  src={mirror1}
                  alt="Featured Mirror"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50" />

                {/* Gleam animation overlay */}
                <div className="gleam-overlay" />
              </Link>
            </motion.div>

            {/* Surrounding mirrors in circular pattern */}
            {mirrorItems.slice(1).map((item, index) => {
              // Calculate position in circle
              const angle = (index * 90) - 45; // 4 items at 90° intervals, starting at -45°
              const radius = 350;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.3, x: 0, y: 0 }}
                  whileInView={{ opacity: 1, scale: 1, x, y }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    delay: item.delay,
                    type: 'spring',
                    stiffness: 100,
                  }}
                  className="absolute w-[200px] h-[250px] group"
                >
                  <Link to="/category/art?productType=mirror" className="block w-full h-full relative overflow-hidden rounded-lg gleam-effect">
                    <img
                      src={item.image}
                      alt={`Mirror ${index + 2}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-2"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50" />

                    {/* Gleam animation overlay */}
                    <div className="gleam-overlay" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/category/art?productType=mirror"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 border-b-2 border-gray-900 pb-1 hover:border-gray-600 hover:text-gray-600 transition-colors"
            >
              <span>Explore All Mirrors</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* SECTION 3: SPLIT PARALLAX - Art scrolling up, Mirrors scrolling down */}
      <div className="py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-light text-gray-900 mb-6 uppercase tracking-wider">
              Curated For You
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A harmonious blend of artistic expression and reflective elegance
            </p>
          </motion.div>

          {/* Split Parallax Container */}
          <div className="grid grid-cols-2 gap-8 h-[800px] overflow-hidden">
            {/* Left - Art scrolling UP */}
            <div className="relative overflow-hidden rounded-lg">
              <div className="flex flex-col animate-scroll-up-slow">
                {/* Original set */}
                {[art3, art4, art5, art6, art7].map((image, index) => (
                  <div key={`art-orig-${index}`} className="flex-shrink-0 w-full h-[350px] mb-8">
                    <img
                      src={image}
                      alt={`Art ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {[art3, art4, art5, art6, art7].map((image, index) => (
                  <div key={`art-dup-${index}`} className="flex-shrink-0 w-full h-[350px] mb-8">
                    <img
                      src={image}
                      alt={`Art ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Mirrors scrolling DOWN */}
            <div className="relative overflow-hidden rounded-lg">
              <div className="flex flex-col animate-scroll-down-slow">
                {/* Original set */}
                {[mirror2, mirror3, mirror4, mirror5].map((image, index) => (
                  <div key={`mirror-orig-${index}`} className="flex-shrink-0 w-full h-[350px] mb-8">
                    <img
                      src={image}
                      alt={`Mirror ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {[mirror2, mirror3, mirror4, mirror5].map((image, index) => (
                  <div key={`mirror-dup-${index}`} className="flex-shrink-0 w-full h-[350px] mb-8">
                    <img
                      src={image}
                      alt={`Mirror ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SHOP ALL CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="border-t bg-gray-50"
      >
        <div className="max-w-screen-2xl mx-auto px-6 py-16 text-center">
          <Link
            to="/category/art?view=all"
            className="inline-block px-10 py-4 bg-gray-900 text-white text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            Shop All Art & Mirrors
          </Link>
        </div>
      </motion.div>

      {/* CSS ANIMATIONS */}
      <style>{`
        /* Horizontal scroll for hero */
        @keyframes scroll-horizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-2400px);
          }
        }

        .animate-scroll-horizontal {
          animation: scroll-horizontal 30s linear infinite;
          will-change: transform;
        }

        .animate-scroll-horizontal:hover {
          animation-play-state: paused;
        }

        /* Slow scroll UP for art (left side) */
        @keyframes scroll-up-slow {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        .animate-scroll-up-slow {
          animation: scroll-up-slow 40s linear infinite;
          will-change: transform;
        }

        /* Slow scroll DOWN for mirrors (right side) */
        @keyframes scroll-down-slow {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-scroll-down-slow {
          animation: scroll-down-slow 40s linear infinite;
          will-change: transform;
        }

        /* Gleam effect for mirrors */
        .gleam-effect {
          position: relative;
          overflow: hidden;
        }

        .gleam-overlay {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-25deg);
          animation: gleam 5s infinite;
        }

        @keyframes gleam {
          0% {
            left: -100%;
          }
          20% {
            left: 150%;
          }
          100% {
            left: 150%;
          }
        }

        .gleam-effect:hover .gleam-overlay {
          animation-duration: 2s;
        }
      `}</style>
    </div>
  );
}
