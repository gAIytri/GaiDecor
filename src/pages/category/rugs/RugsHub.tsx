import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

// Import rug images - organized by category
// Indoor rugs: rug-1 to rug-7
import rug1 from '@/assets/rugs/rug-1.jpeg';
import rug2 from '@/assets/rugs/rug-2.jpeg';
import rug3 from '@/assets/rugs/rug-3.jpeg';
import rug4 from '@/assets/rugs/rug-4.jpeg';
import rug6 from '@/assets/rugs/rug-6.jpeg';
import rug7 from '@/assets/rugs/rug-7.jpeg';
// Indoor/Outdoor rugs: rug-8 to rug-13
import rug8 from '@/assets/rugs/rug-8.jpeg';
import rug9 from '@/assets/rugs/rug-9.jpeg';
import rug10 from '@/assets/rugs/rug-10.jpeg';
import rug11 from '@/assets/rugs/rug-11.jpeg';
import rug13 from '@/assets/rugs/rug-13.jpeg';
// Reversible rugs: rug-14 to rug-19
import rug14 from '@/assets/rugs/rug-14.jpeg';
import rug15 from '@/assets/rugs/rug-15.jpeg';
import rug16 from '@/assets/rugs/rug-16.jpeg';
import rug17 from '@/assets/rugs/rug-17.jpeg';
import rug18 from '@/assets/rugs/rug-18.jpeg';
// Natural Fiber rugs: rug-20 to rug-25
import rug20 from '@/assets/rugs/rug-20.jpg';

// Hero images that will scroll
const heroImages = [rug10, rug13, rug15, rug17];

// Subcategories with images - Updated to new product types
// Each image matches the actual product category in rugs.json
const subcategories = [
  { name: 'Indoor Rugs', slug: 'indoor-rug', image: rug1, description: 'Define your space with style' },           // rug-1 = Indoor Rug
  { name: 'Indoor/Outdoor Rugs', slug: 'indoor-outdoor-rug', image: rug8, description: 'Versatile beauty for any setting' },  // rug-8 = Indoor/Outdoor Rug
  { name: 'Reversible Rugs', slug: 'reversible-rug', image: rug15, description: 'Two looks in one' },              // rug-15 = Reversible Rug
  { name: 'Natural Fiber Rugs', slug: 'natural-fiber-rug', image: rug20, description: 'Sustainable elegance' },    // rug-20 = Natural Fiber Rug (Jute)
];

// Component for individual rug card with drop animation
function RugCard({ subcategory, index }: { subcategory: typeof subcategories[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ y: -300, opacity: 0, rotate: -8 }}
      animate={isInView ? {
        y: 0,
        opacity: 1,
        rotate: 0,
        transition: {
          type: "spring",
          damping: 15,
          stiffness: 100,
          delay: index * 0.15
        }
      } : {}}
    >
      <Link to={`/category/rugs?productType=${subcategory.slug}`} className="group block">
        <div className="relative overflow-hidden bg-gray-100 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 aspect-[3/4]">
          {/* Rug Image - fixed aspect ratio container */}
          <img
            src={subcategory.image}
            alt={subcategory.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

          {/* Text Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-2xl font-light mb-2 uppercase tracking-wider">
              {subcategory.name}
            </h3>
            <p className="text-sm text-white/90 mb-4">{subcategory.description}</p>
            <div className="inline-flex items-center gap-2 text-sm font-medium border-b-2 border-white pb-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Shop Now</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Newest Collection Section Component
function NewestCollectionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="max-w-screen-2xl mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
        {/* Text Content - Left */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
            New Arrival
          </p>
          <h2 className="text-5xl font-light text-gray-900 mb-6 uppercase tracking-wider">
            The Heritage Collection
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Introducing our newest collection of handwoven rugs that celebrate timeless craftsmanship
            and contemporary design. Each piece in the Heritage Collection tells a story of artisan
            dedication, featuring intricate patterns inspired by global traditions and crafted with
            premium natural fibers. These rugs aren't just floor coverings—they're heirlooms in the making,
            designed to anchor your space with warmth, texture, and enduring beauty.
          </p>
          <Link
            to="/category/rugs?productType=indoor-rug"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 border-b-2 border-gray-900 pb-1 hover:border-gray-600 hover:text-gray-600 transition-colors"
          >
            <span>Explore Collection</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Images - Right */}
        <div className="flex-1 relative h-[300px] md:h-[500px]">
          {/* Large Image - Drops from top */}
          <motion.div
            initial={{ y: -400, opacity: 0, rotate: -5 }}
            animate={isInView ? { y: 0, opacity: 1, rotate: 0 } : {}}
            transition={{ type: "spring", damping: 20, stiffness: 80, delay: 0.2 }}
            className="absolute left-0 top-0 w-[65%] h-[420px] rounded-lg overflow-hidden shadow-2xl"
          >
            <img
              src={rug16}
              alt="Heritage Collection"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Small Image - Drops from top with delay */}
          <motion.div
            initial={{ y: -400, opacity: 0, rotate: 5 }}
            animate={isInView ? { y: 0, opacity: 1, rotate: 0 } : {}}
            transition={{ type: "spring", damping: 20, stiffness: 80, delay: 0.4 }}
            className="absolute right-0 bottom-0 w-[45%] h-[280px] rounded-lg overflow-hidden shadow-xl"
          >
            <img
              src={rug18}
              alt="Heritage Collection Detail"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Rotating Image Showcase Component
function RotatingShowcase() {
  const [currentLeftImage, setCurrentLeftImage] = useState(0);
  const leftImages = [rug2, rug4, rug6, rug9, rug11];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLeftImage((prev) => (prev + 1) % leftImages.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50 py-24">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="grid grid-cols-2 gap-4 md:gap-6 h-[350px] md:h-[600px]">
          {/* Left Side - Rotating Images */}
          <div className="relative overflow-hidden rounded-lg">
            {leftImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: currentLeftImage === index ? 1 : 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <img
                  src={image}
                  alt={`Rug Style ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-3xl font-light mb-2 uppercase tracking-wider">
                    {['Modern Minimalist', 'Bohemian Charm', 'Vintage Classic', 'Contemporary Art', 'Natural Textures'][index]}
                  </h3>
                  <p className="text-sm text-white/90">
                    Discover unique patterns and textures
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side - Static Image */}
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={rug14}
              alt="Featured Rug"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-3xl font-light mb-4 uppercase tracking-wider">
                Style Meets Comfort
              </h3>
              <p className="text-base text-white/90 mb-6">
                Every rug in our collection is carefully selected to bring warmth,
                character, and sophistication to your home.
              </p>
              <Link
                to="/category/rugs?view=all"
                className="inline-flex items-center gap-2 text-sm font-medium text-white border-b-2 border-white pb-1 hover:border-white/70 hover:text-white/70 transition-colors"
              >
                <span>Browse All Styles</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Interactive Room Visualizer Component
function RoomVisualizer() {
  const [currentRoom, setCurrentRoom] = useState(0);
  const rooms = [
    { name: 'Living Room', image: rug7, description: 'Anchor your living space' },
    { name: 'Bedroom', image: rug3, description: 'Create a cozy retreat' },
    { name: 'Dining Room', image: rug15, description: 'Define your dining area' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoom((prev) => (prev + 1) % rooms.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-light text-gray-900 mb-4 uppercase tracking-wider">
          Envision Your Space
        </h2>
        <p className="text-lg text-gray-600">
          See how our rugs transform different rooms in your home
        </p>
      </div>

      <div className="relative h-[300px] md:h-[500px] rounded-lg overflow-hidden">
        {rooms.map((room, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentRoom === index ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={room.image}
              alt={room.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center text-center text-white">
              <div>
                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  animate={currentRoom === index ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.3 }}
                  className="text-5xl font-light mb-4 uppercase tracking-widest"
                >
                  {room.name}
                </motion.h3>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={currentRoom === index ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.5 }}
                  className="text-xl text-white/90"
                >
                  {room.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Room Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
          {rooms.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentRoom(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentRoom === index ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Material & Texture Close-Up Component
function MaterialShowcase() {
  // Images matched to actual materials in rugs.json
  // materialFilter matches the values in rugs.json attributes.material
  const materials = [
    { name: 'Wool', materialFilter: 'Wool', image: rug2, description: 'Natural, durable, and luxuriously soft' },
    { name: 'Cotton', materialFilter: 'Cotton', image: rug14, description: 'Breathable, easy to clean, versatile' },
    { name: 'Jute', materialFilter: 'Jute', image: rug20, description: 'Eco-friendly, textured, naturally elegant' },
    { name: 'Synthetic', materialFilter: 'Polypropylene', image: rug9, description: 'Stain-resistant, affordable, low-maintenance' },
  ];

  return (
    <div className="bg-gray-50 py-24">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-4 uppercase tracking-wider">
            Quality Materials
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each rug is crafted from premium materials chosen for beauty, durability, and sustainability
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {materials.map((material, index) => (
            <motion.div
              key={material.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Link
                to={`/category/rugs?material=${material.materialFilter}`}
                className="group block"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                  <img
                    src={material.image}
                    alt={material.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-2 uppercase tracking-wider group-hover:text-gray-600 transition-colors">
                  {material.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {material.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RugsHub() {
  return (
    <div className="min-h-screen bg-white -mt-14 pt-14">
      {/* HERO - Horizontal Auto-Scrolling Images (600px) */}
      <div className="relative h-[350px] md:h-[600px] w-full overflow-hidden bg-gray-900">
        {/* Scrolling Container */}
        <div className="absolute inset-0 flex animate-scroll">
          {/* First set of images */}
          {heroImages.map((image, index) => (
            <div key={`first-${index}`} className="flex-shrink-0 w-[300px] md:w-[600px] h-full">
              <img
                src={image}
                alt={`Rug ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {heroImages.map((image, index) => (
            <div key={`second-${index}`} className="flex-shrink-0 w-[300px] md:w-[600px] h-full">
              <img
                src={image}
                alt={`Rug ${index + 1}`}
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
              className="text-3xl md:text-6xl font-light mb-4 uppercase tracking-widest"
            >
              Rugs
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-white/90 max-w-2xl mx-auto"
            >
              Transform your floors with our curated collection of exquisite rugs
            </motion.p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT - Dropping Rugs */}
      <div className="max-w-screen-2xl mx-auto px-6 py-20">
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
            Find the perfect rug for every room and style
          </p>
        </motion.div>

        {/* Grid with Drop Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {subcategories.map((subcategory, index) => (
            <RugCard key={subcategory.slug} subcategory={subcategory} index={index} />
          ))}
        </div>
      </div>

      {/* NEW SECTION 1: Newest Collection */}
      <NewestCollectionSection />

      {/* NEW SECTION 2: Rotating Image Showcase */}
      <RotatingShowcase />

      {/* NEW SECTION 3: Interactive Room Visualizer */}
      <RoomVisualizer />

      {/* NEW SECTION 4: Material & Texture Showcase */}
      <MaterialShowcase />

      {/* Shop All CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="border-t bg-white"
      >
        <div className="max-w-screen-2xl mx-auto px-2 py-16 text-center">
          <Link
            to="/category/rugs?view=all"
            className="inline-block px-10 py-4 bg-gray-900 text-white text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            View All Rugs
          </Link>
        </div>
      </motion.div>

      {/* CSS for infinite horizontal scroll */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-2400px); /* 4 images * 600px width */
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
