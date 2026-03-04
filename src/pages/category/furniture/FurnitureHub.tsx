import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

// Import hero images for horizontal scroll (using product images)
import sofa1 from '@/assets/furniture/sofa/sofa-1.jpg';
import sofa2 from '@/assets/furniture/sofa/sofa-2.jpg';
import tvStand1 from '@/assets/furniture/tvstand/tv-stand-1.jpg';
import coffeeTable1 from '@/assets/furniture/coffee table/coffee-table-1.jpg';

// Import featured images
import chair1 from '@/assets/furniture/accent chairs/accent-chair-1.jpg';

// Import sofa collection images
import sofa3 from '@/assets/furniture/sofa/sofa-3.jpg';
import sofa4 from '@/assets/furniture/sofa/sofa-4.jpg';
import sofa5 from '@/assets/furniture/sofa/sofa-5.jpg';

// Import chair collection images
import chair2 from '@/assets/furniture/accent chairs/accent-chair-2.jpg';
import chair3 from '@/assets/furniture/accent chairs/accent-chair-3.jpg';
import chair4 from '@/assets/furniture/accent chairs/accent-chair-4.jpg';
import chair5 from '@/assets/furniture/accent chairs/accent-chair-5.jpg';

// Import coffee table collection images
import coffeeTable2 from '@/assets/furniture/coffee table/coffee-table-2.jpg';
import coffeeTable3 from '@/assets/furniture/coffee table/coffee-table-3.jpg';
import coffeeTable4 from '@/assets/furniture/coffee table/coffee-table-4.jpg';

// Import TV stand collection images
import tvStand2 from '@/assets/furniture/tvstand/tv-stand-2.jpg';
import tvStand3 from '@/assets/furniture/tvstand/tv-stand-3.jpg';
import tvStand4 from '@/assets/furniture/tvstand/tv-stand-4.jpg';

// Reusable Scrolling Collection Section Component
interface ScrollingCollectionProps {
  title: string;
  description: string;
  images: string[];
  slug: string;
  reverse?: boolean;
}

function ScrollingCollectionSection({ title, description, images, slug, reverse = false }: ScrollingCollectionProps) {
  return (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-center mb-16 md:mb-24`}>
      {/* Scrolling Images - Left/Right */}
      <div className="w-full md:flex-1 relative h-[350px] md:h-[600px] overflow-hidden rounded-lg bg-gray-900">
        {/* Scrolling Container - Double the images for seamless loop */}
        <div className="flex flex-col animate-scroll-up-seamless">
          {/* Original set */}
          {images.map((image, index) => (
            <div key={`orig-${index}`} className="flex-shrink-0 w-full h-[300px]">
              <img
                src={image}
                alt={`${title} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {images.map((image, index) => (
            <div key={`dup-${index}`} className="flex-shrink-0 w-full h-[300px]">
              <img
                src={image}
                alt={`${title} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Text Content - Right/Left */}
      <div className="w-full md:flex-1 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl font-light text-gray-900 mb-4 md:mb-6 uppercase tracking-wider">
            {title}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            {description}
          </p>
          <Link
            to={`/category/furniture?productType=${slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 border-b-2 border-gray-900 pb-1 hover:border-gray-600 hover:text-gray-600 transition-colors"
          >
            <span>Explore {title}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function FurnitureHub() {
  const heroImages = [sofa1, chair1, coffeeTable1, tvStand1];
  const sofaImages = [sofa1, sofa2, sofa3, sofa4, sofa5];
  const chairImages = [chair1, chair2, chair3, chair4, chair5];
  const coffeeTableImages = [coffeeTable1, coffeeTable2, coffeeTable3, coffeeTable4];
  const tvStandImages = [tvStand1, tvStand2, tvStand3, tvStand4];

  return (
    <div className="min-h-screen bg-white -mt-14 pt-14">
      {/* Breadcrumb */}
   

      {/* HERO SECTION - Horizontal Auto-Scrolling */}
      <div className="relative h-[350px] md:h-[600px] w-full overflow-hidden bg-gray-900">
        {/* Scrolling Container */}
        <div className="absolute inset-0 flex animate-scroll-horizontal">
          {/* First set of images */}
          {heroImages.map((image, index) => (
            <div key={`first-${index}`} className="flex-shrink-0 w-[300px] md:w-[600px] h-full">
              <img
                src={image}
                alt={`Furniture ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {heroImages.map((image, index) => (
            <div key={`second-${index}`} className="flex-shrink-0 w-[300px] md:w-[600px] h-full">
              <img
                src={image}
                alt={`Furniture ${index + 1}`}
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
            <h1 className="text-3xl md:text-6xl font-light mb-4 uppercase tracking-widest">
              Furniture
            </h1>
            <p className="text-base md:text-xl text-white/90 max-w-2xl mx-auto">
              Timeless pieces that define your space
            </p>
          </motion.div>
        </div>
      </div>

      {/* FOUR FEATURED IMAGES ROW */}
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-10 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-16">
          {/* Sofas */}
          <Link to="/category/furniture?productType=sofa" className="group relative aspect-[4/5] overflow-hidden rounded-lg">
            <img
              src={sofa1}
              alt="Sofas"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl font-light uppercase tracking-wider">Sofas</h3>
            </div>
          </Link>

          {/* Accent Chairs */}
          <Link to="/category/furniture?productType=accent-chair" className="group relative aspect-[4/5] overflow-hidden rounded-lg">
            <img
              src={chair1}
              alt="Accent Chairs"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl font-light uppercase tracking-wider">Accent Chairs</h3>
            </div>
          </Link>

          {/* Coffee Tables */}
          <Link to="/category/furniture?productType=coffee-table" className="group relative aspect-[4/5] overflow-hidden rounded-lg">
            <img
              src={coffeeTable1}
              alt="Coffee Tables"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl font-light uppercase tracking-wider">Coffee Tables</h3>
            </div>
          </Link>

          {/* TV Stands */}
          <Link to="/category/furniture?productType=tv-stand" className="group relative aspect-[4/5] overflow-hidden rounded-lg">
            <img
              src={tvStand1}
              alt="TV Stands"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl font-light uppercase tracking-wider">TV Stands</h3>
            </div>
          </Link>
        </div>

        {/* TEXT SECTION ABOUT GAI DECOR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-24 px-8"
        >
          <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-4 md:mb-6 uppercase tracking-wider">
            Crafted for Modern Living
          </h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            At gAIytri, we believe furniture is more than function—it's the foundation of your home's story.
            Each piece in our collection is thoughtfully curated to blend timeless design with contemporary comfort.
            From the clean lines of our sofas to the sculptural beauty of our accent chairs, every item reflects
            our commitment to quality craftsmanship, sustainable materials, and enduring style. Transform your space
            with furniture that's built to last and designed to inspire.
          </p>
        </motion.div>

        {/* SCROLLING COLLECTION SECTIONS */}
        <div className="space-y-0">
          {/* Sofa Collection */}
          <ScrollingCollectionSection
            title="Sofa Collection"
            description="Sink into luxury with our curated sofa collection. Each piece combines plush comfort with refined aesthetics, featuring premium upholstery, solid wood frames, and cushioning that maintains its shape. Whether you prefer the sleek minimalism of a modern sectional or the classic elegance of a Chesterfield, our sofas are designed to be the centerpiece of your living space."
            images={sofaImages}
            slug="sofa"
            reverse={false}
          />

          {/* Chair Collection */}
          <ScrollingCollectionSection
            title="Accent Chairs"
            description="Make a statement with our distinctive accent chairs. From mid-century modern classics to contemporary sculptural designs, each chair is a work of art. Expertly crafted with ergonomic support and luxurious fabrics, these pieces add personality and sophistication to any room. Perfect for creating cozy reading nooks or elevating your living room aesthetic."
            images={chairImages}
            slug="accent-chair"
            reverse={true}
          />

          {/* Coffee Table Collection */}
          <ScrollingCollectionSection
            title="Coffee Tables"
            description="Ground your living space with our exquisite coffee table collection. Featuring a range of materials from rich hardwoods to sleek marble and metal, each table balances form and function. Thoughtful designs include hidden storage, adjustable heights, and multifunctional surfaces. These statement pieces anchor your seating area while providing the perfect surface for morning coffee or evening entertainment."
            images={coffeeTableImages}
            slug="coffee-table"
            reverse={false}
          />

          {/* TV Stand Collection */}
          <ScrollingCollectionSection
            title="TV Stands"
            description="Elevate your entertainment space with our carefully curated TV stand collection. From minimalist floating consoles to substantial media centers, each piece combines smart cable management with stylish design. Crafted with premium materials including solid wood, tempered glass, and powder-coated metal, our TV stands offer both visual appeal and practical storage solutions for all your media needs."
            images={tvStandImages}
            slug="tv-stand"
            reverse={true}
          />
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
            to="/category/furniture?view=all"
            className="inline-block px-10 py-4 bg-gray-900 text-white text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            View All Furniture
          </Link>
        </div>
      </motion.div>

      {/* CSS for scroll animations */}
      <style>{`
        /* Horizontal scroll for hero */
        @keyframes scroll-horizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-1200px);
          }
        }

        @media (min-width: 768px) {
          @keyframes scroll-horizontal {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-2400px);
            }
          }
        }

        .animate-scroll-horizontal {
          animation: scroll-horizontal 30s linear infinite;
          will-change: transform;
        }

        .animate-scroll-horizontal:hover {
          animation-play-state: paused;
        }

        /* Vertical scroll for collections */
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
