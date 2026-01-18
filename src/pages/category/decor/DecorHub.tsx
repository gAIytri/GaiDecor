import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

// Import hero images (one from each category for horizontal scroll)
import vase3 from '@/assets/decor/vases/vase-3.jpeg';
import candle2 from '@/assets/decor/candles/candle-2.jpeg';
import object4 from '@/assets/decor/decorative-objects/object-4.jpeg';
import pillow3 from '@/assets/decor/throw-pillows/pillow-3.jpeg';

// Import collage images
import vase1 from '@/assets/decor/vases/vase-1.jpeg';
import vase2 from '@/assets/decor/vases/vase-2.jpeg';
import vase4 from '@/assets/decor/vases/vase-4.jpeg';
import vase5 from '@/assets/decor/vases/vase-5.jpeg';
import candle1 from '@/assets/decor/candles/candle-1.jpeg';
import candle3 from '@/assets/decor/candles/candle-3.jpeg';
import candle4 from '@/assets/decor/candles/candle-4.jpeg';
import object1 from '@/assets/decor/decorative-objects/object-1.jpeg';
import object2 from '@/assets/decor/decorative-objects/object-2.jpeg';
import object3 from '@/assets/decor/decorative-objects/object-3.jpeg';
import object5 from '@/assets/decor/decorative-objects/object-5.jpeg';
import object6 from '@/assets/decor/decorative-objects/object-6.jpeg';
import pillow1 from '@/assets/decor/throw-pillows/pillow-1.jpeg';
import pillow2 from '@/assets/decor/throw-pillows/pillow-2.jpeg';
import pillow4 from '@/assets/decor/throw-pillows/pillow-4.jpeg';

const heroImages = [vase3, candle2, object4, pillow3];

export default function DecorHub() {
  return (
    <div className="min-h-screen bg-white -mt-14 pt-14">
      {/* HERO SECTION - Horizontal Auto-Scrolling */}
      <div className="relative h-[600px] w-full overflow-hidden bg-gray-900">
        {/* Scrolling Container */}
        <div className="absolute inset-0 flex animate-scroll-horizontal">
          {/* First set of images */}
          {heroImages.map((image, index) => (
            <div key={`first-${index}`} className="flex-shrink-0 w-[600px] h-full">
              <img
                src={image}
                alt={`Decor ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {heroImages.map((image, index) => (
            <div key={`second-${index}`} className="flex-shrink-0 w-[600px] h-full">
              <img
                src={image}
                alt={`Decor ${index + 1}`}
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
              Home Decor
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Curated pieces that transform your house into a home
            </p>
          </motion.div>
        </div>
      </div>

      {/* 8-IMAGE COLLAGE SECTION */}
      <div className="max-w-screen-2xl mx-auto px-6 py-20">
        {/* Section Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-light text-gray-900 mb-4 uppercase tracking-wider">
            The Art of Details
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Every corner of your home deserves attention. Explore our collection of thoughtfully designed decorative pieces
          </p>
        </motion.div>

        {/* 8-Image Grid Collage */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-4 grid-rows-3 gap-4 h-[800px]"
        >
          {/* Large image - spans 2x2 - Top Left */}
          <div className="col-span-2 row-span-2 relative overflow-hidden rounded-lg group">
            <img
              src={vase1}
              alt="Elegant Vases"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <p className="text-xs font-semibold tracking-widest uppercase mb-2">Vases</p>
              <h3 className="text-3xl font-light">Sculptural Beauty</h3>
            </div>
          </div>

          {/* Tall image - Top Right */}
          <div className="row-span-2 relative overflow-hidden rounded-lg group">
            <img
              src={candle1}
              alt="Ambient Candles"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-xs font-semibold tracking-widest uppercase mb-2">Candles</p>
              <h3 className="text-2xl font-light">Warm Glow</h3>
            </div>
          </div>

          {/* Square image - Top Right Corner */}
          <div className="relative overflow-hidden rounded-lg group">
            <img
              src={object1}
              alt="Decorative Objects"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <p className="text-xs font-semibold tracking-widest uppercase">Objects</p>
            </div>
          </div>

          {/* Square image */}
          <div className="relative overflow-hidden rounded-lg group">
            <img
              src={pillow1}
              alt="Throw Pillows"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <p className="text-xs font-semibold tracking-widest uppercase">Pillows</p>
            </div>
          </div>

          {/* Wide image - Bottom Left - spans 2 columns */}
          <div className="col-span-2 relative overflow-hidden rounded-lg group">
            <img
              src={object3}
              alt="Statement Pieces"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-xs font-semibold tracking-widest uppercase mb-2">Decorative Objects</p>
              <h3 className="text-2xl font-light">Statement Pieces</h3>
            </div>
          </div>

          {/* Square image */}
          <div className="relative overflow-hidden rounded-lg group">
            <img
              src={vase2}
              alt="Modern Vases"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <p className="text-xs font-semibold tracking-widest uppercase">Vases</p>
            </div>
          </div>

          {/* Square image */}
          <div className="relative overflow-hidden rounded-lg group">
            <img
              src={candle3}
              alt="Scented Candles"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <p className="text-xs font-semibold tracking-widest uppercase">Candles</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* SECTION 1: VASES - 2 Images Left, Text Right */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="flex gap-12 items-center">
            {/* Left - 2 Images Stacked */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <div className="grid grid-rows-2 gap-6 h-[700px]">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={vase4}
                    alt="Vase Collection"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={vase5}
                    alt="Vase Collection"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right - Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 px-8"
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">
                Vases
              </p>
              <h2 className="text-4xl font-light text-gray-900 mb-6 uppercase tracking-wider">
                Sculptural Elegance
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Our vase collection celebrates form and function in equal measure. From minimalist ceramic pieces to bold glass sculptures, each vase is selected for its ability to elevate your flowers—or stand beautifully on its own. These aren't just containers; they're centerpieces that command attention and spark conversation.
              </p>
              <Link
                to="/category/decor?productType=vase"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 border-b-2 border-gray-900 pb-1 hover:border-gray-600 hover:text-gray-600 transition-colors"
              >
                <span>Explore Vases</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* SECTION 2: CANDLES - Text Left, 3 Images Right (Asymmetric Grid) */}
      <div className="py-24">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="flex gap-12 items-center">
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 px-8"
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">
                Candles
              </p>
              <h2 className="text-4xl font-light text-gray-900 mb-6 uppercase tracking-wider">
                Ambient Warmth
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Create atmosphere with our carefully curated candle collection. Each piece combines beautiful design with inviting scents and clean-burning wax. Whether you're setting a mood for dinner or adding a touch of luxury to your bathroom, these candles bring warmth and elegance to every moment. Light transforms space—let our candles transform yours.
              </p>
              <Link
                to="/category/decor?productType=candle"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 border-b-2 border-gray-900 pb-1 hover:border-gray-600 hover:text-gray-600 transition-colors"
              >
                <span>Explore Candles</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Right - 3 Images Asymmetric Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <div className="grid grid-cols-2 gap-6 h-[600px]">
                {/* Tall left image */}
                <div className="relative overflow-hidden rounded-lg row-span-2">
                  <img
                    src={candle2}
                    alt="Candle Collection"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Two stacked right images */}
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={candle4}
                    alt="Candle Collection"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={candle1}
                    alt="Candle Collection"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* SECTION 3: DECORATIVE OBJECTS - 3 Images Left, Text Right */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="flex gap-12 items-center">
            {/* Left - 3 Images in Creative Layout */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <div className="grid grid-cols-2 gap-6 h-[600px]">
                {/* Top left spanning full width */}
                <div className="col-span-2 relative overflow-hidden rounded-lg">
                  <img
                    src={object2}
                    alt="Decorative Objects"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Bottom two side by side */}
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={object5}
                    alt="Decorative Objects"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={object6}
                    alt="Decorative Objects"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right - Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 px-8"
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">
                Decorative Objects
              </p>
              <h2 className="text-4xl font-light text-gray-900 mb-6 uppercase tracking-wider">
                Curated Artistry
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                The magic is in the details. Our decorative objects are chosen for their ability to add personality and charm to any space. From sculptural bookends to artisan bowls, each piece tells its own story. These are the finishing touches that make a room feel complete, the conversation starters that reflect your refined taste.
              </p>
              <Link
                to="/category/decor?productType=decorative-object"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 border-b-2 border-gray-900 pb-1 hover:border-gray-600 hover:text-gray-600 transition-colors"
              >
                <span>Explore Objects</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* SECTION 4: THROW PILLOWS - Text Left, 2 Images Right (Side by Side) */}
      <div className="py-24">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="flex gap-12 items-center">
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 px-8"
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">
                Throw Pillows
              </p>
              <h2 className="text-4xl font-light text-gray-900 mb-6 uppercase tracking-wider">
                Comfort & Style
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Transform your sofa, bed, or favorite chair with our collection of throw pillows. Mixing textures, patterns, and colors has never been easier. From luxe velvet to natural linen, from geometric prints to solid sophistication—these pillows are the quickest way to refresh your space and add layers of comfort and visual interest.
              </p>
              <Link
                to="/category/decor?productType=throw-pillow"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 border-b-2 border-gray-900 pb-1 hover:border-gray-600 hover:text-gray-600 transition-colors"
              >
                <span>Explore Pillows</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Right - 2 Images Side by Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <div className="grid grid-cols-2 gap-6 h-[500px]">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={pillow2}
                    alt="Throw Pillows"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={pillow4}
                    alt="Throw Pillows"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
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
            to="/category/decor?view=all"
            className="inline-block px-10 py-4 bg-gray-900 text-white text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            Shop All Decor
          </Link>
        </div>
      </motion.div>

      {/* CSS for horizontal scroll animation */}
      <style>{`
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
      `}</style>
    </div>
  );
}
