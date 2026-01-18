import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

// Import hero images (mix from all categories)
import bedding1 from '@/assets/bedding/bedding-sets/bedding-1.jpeg';
import curtain1 from '@/assets/bedding/curtains/curtain-1.jpeg';
import blanket1 from '@/assets/bedding/throw-blankets/blanket-1.jpeg';
import bedding3 from '@/assets/bedding/bedding-sets/bedding-3.jpeg';

// Import all bedding set images for 3D flip cards
import bedding2 from '@/assets/bedding/bedding-sets/bedding-2.jpeg';
import bedding4 from '@/assets/bedding/bedding-sets/bedding-4.jpeg';
import bedding5 from '@/assets/bedding/bedding-sets/bedding-5.jpeg';
import bedding6 from '@/assets/bedding/bedding-sets/bedding-6.jpeg';

// Import curtain images for cascade
import curtain2 from '@/assets/bedding/curtains/curtain-2.jpeg';
import curtain3 from '@/assets/bedding/curtains/curtain-3.jpeg';
import curtain4 from '@/assets/bedding/curtains/curtain-4.jpeg';

// Import throw blanket images for wave effect
import blanket2 from '@/assets/bedding/throw-blankets/blanket-2.jpeg';
import blanket3 from '@/assets/bedding/throw-blankets/blanket-3.jpeg';
import blanket4 from '@/assets/bedding/throw-blankets/blanket-4.jpeg';

const heroImages = [bedding1, curtain1, blanket1, bedding3];

// Bedding cards for 3D flip effect
const beddingCards = [
  { image: bedding1, title: 'Luxury Linen' },
  { image: bedding2, title: 'Cotton Comfort' },
  { image: bedding3, title: 'Silk Dreams' },
  { image: bedding4, title: 'Modern Elegance' },
  { image: bedding5, title: 'Classic White' },
  { image: bedding6, title: 'Textured Layers' },
];


// Blanket images for wave effect
const blanketImages = [blanket1, blanket2, blanket3, blanket4];

// Elegant Card Component with zoom hover effect
function BeddingCard({ image, title, delay }: { image: string; title: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: 'easeOut',
      }}
      className="bedding-card-container"
    >
      <Link to="/category/bedding?productType=bedding-set" className="block w-full h-full group">
        <div className="relative h-[400px] overflow-hidden rounded-lg">
          {/* Image with zoom effect */}
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Gradient overlay - always visible at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-xl font-light tracking-wide mb-2 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
              {title}
            </h3>

            {/* Reveal on hover */}
            <div className="opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
              <span className="inline-flex items-center gap-2 text-sm font-medium border-b border-white/60 pb-1">
                <span>Shop Now</span>
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BeddingHub() {
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
                alt={`Bedding ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {/* Duplicate set */}
          {heroImages.map((image, index) => (
            <div key={`second-${index}`} className="flex-shrink-0 w-[600px] h-full">
              <img
                src={image}
                alt={`Bedding ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Soft Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Hero Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center text-white px-4"
          >
            <h1 className="text-6xl font-light mb-4 uppercase tracking-widest">
              Bedding & Curtains
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Where comfort meets elegance
            </p>
          </motion.div>
        </div>
      </div>

      {/* SECTION 1: BEDDING SETS - 3D Flip Card Grid */}
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
            Bedding Sets
          </p>
          <h2 className="text-5xl font-light text-gray-900 mb-6 uppercase tracking-wider">
            The Perfect Rest
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Luxurious bedding sets designed to transform your bedroom into a haven of comfort
          </p>
        </motion.div>

        {/* Bedding Card Grid - 3 columns x 2 rows */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {beddingCards.map((card, index) => (
            <BeddingCard
              key={index}
              image={card.image}
              title={card.title}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/category/bedding?productType=bedding-set"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 border-b-2 border-gray-900 pb-1 hover:border-gray-600 hover:text-gray-600 transition-colors"
          >
            <span>Explore All Bedding Sets</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* TEXT BANNER - "Create Your Sanctuary" */}
      <div className="relative h-[500px] overflow-hidden" style={{ background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-8 max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-6"
            >
              Your Personal Sanctuary
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-6xl md:text-7xl font-light text-gray-900 mb-8 uppercase tracking-wider leading-tight"
            >
              Create Your Sanctuary
            </motion.h2>

            {/* Line by line text reveal */}
            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Every day begins and ends in your bedroom.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                Make it a space that nurtures rest, inspires dreams,
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.0, duration: 0.8 }}
              >
                and welcomes you home.
              </motion.p>
            </div>
          </div>
        </div>

        {/* Subtle decorative circles */}
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white/30 blur-2xl" />
        <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-white/20 blur-3xl" />
      </div>

      {/* SECTION 2: CURTAINS - Cascading Waterfall Effect */}
      <div className="bg-white py-24">
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
              Curtains
            </p>
            <h2 className="text-5xl font-light text-gray-900 mb-6 uppercase tracking-wider">
              Frame Your Windows
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Elegant window treatments that control light, ensure privacy, and complete your room's aesthetic
            </p>
          </motion.div>

          {/* Cascading Grid - Images fall from top */}
          <div className="grid grid-cols-12 gap-6 auto-rows-[300px]">
            {/* First curtain - tall left */}
            <motion.div
              initial={{ y: -400, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                type: 'spring',
                stiffness: 60,
                damping: 15,
              }}
              className="col-span-4 row-span-2 relative overflow-hidden rounded-lg group"
            >
              <Link to="/category/bedding?productType=curtain" className="block w-full h-full">
                <img
                  src={curtain1}
                  alt="Curtains"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </motion.div>

            {/* Second curtain - wide top right */}
            <motion.div
              initial={{ y: -400, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                type: 'spring',
                stiffness: 60,
                damping: 15,
              }}
              className="col-span-8 row-span-1 relative overflow-hidden rounded-lg group"
            >
              <Link to="/category/bedding?productType=curtain" className="block w-full h-full">
                <img
                  src={curtain2}
                  alt="Curtains"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </motion.div>

            {/* Third curtain - square */}
            <motion.div
              initial={{ y: -400, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                type: 'spring',
                stiffness: 60,
                damping: 15,
              }}
              className="col-span-4 row-span-1 relative overflow-hidden rounded-lg group"
            >
              <Link to="/category/bedding?productType=curtain" className="block w-full h-full">
                <img
                  src={curtain3}
                  alt="Curtains"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </motion.div>

            {/* Fourth curtain - medium */}
            <motion.div
              initial={{ y: -400, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.8,
                type: 'spring',
                stiffness: 60,
                damping: 15,
              }}
              className="col-span-4 row-span-1 relative overflow-hidden rounded-lg group"
            >
              <Link to="/category/bedding?productType=curtain" className="block w-full h-full">
                <img
                  src={curtain4}
                  alt="Curtains"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/category/bedding?productType=curtain"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 border-b-2 border-gray-900 pb-1 hover:border-gray-600 hover:text-gray-600 transition-colors"
            >
              <span>Explore All Curtains</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* SECTION 3: THROW BLANKETS - Wave/Ripple Grid */}
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
              Throw Blankets
            </p>
            <h2 className="text-5xl font-light text-gray-900 mb-6 uppercase tracking-wider">
              Cozy Layers
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Soft, warm throw blankets that add texture, warmth, and a touch of luxury to any space
            </p>
          </motion.div>

          {/* Wave/Ripple Grid */}
          <div className="grid grid-cols-4 gap-6">
            {blanketImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  type: 'spring',
                  stiffness: 100,
                }}
                className="wave-item relative aspect-square overflow-hidden rounded-lg group"
              >
                <Link to="/category/bedding?productType=throw-blanket" className="block w-full h-full">
                  <img
                    src={image}
                    alt={`Throw Blanket ${index + 1}`}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Ripple overlay on hover */}
                  <div className="absolute inset-0 ripple-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/category/bedding?productType=throw-blanket"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 border-b-2 border-gray-900 pb-1 hover:border-gray-600 hover:text-gray-600 transition-colors"
            >
              <span>Explore All Throw Blankets</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* SHOP ALL CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="border-t bg-white"
      >
        <div className="max-w-screen-2xl mx-auto px-6 py-16 text-center">
          <Link
            to="/category/bedding?view=all"
            className="inline-block px-10 py-4 bg-gray-900 text-white text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            Shop All Bedding & Curtains
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

        /* Wave/Ripple effect for blankets */
        .wave-item {
          position: relative;
        }

        .ripple-effect {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.05) 40%,
            transparent 70%
          );
          animation: ripple 3s ease-out infinite;
        }

        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }

        .wave-item:hover .ripple-effect {
          animation-duration: 1.5s;
        }
      `}</style>
    </div>
  );
}
