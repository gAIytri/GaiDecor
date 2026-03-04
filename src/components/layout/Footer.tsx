/**
 * Footer Component - SIMPLE & FLEXIBLE
 * Layout: [Brand] -------- [About+Shop] -------- [Newsletter]
 */

import { Link } from 'react-router-dom';
import { Facebook, Youtube, Instagram } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-black text-white relative z-10">

      {/* MAIN SECTION */}
      <div className="max-w-screen-2xl mx-auto px-12 py-16">

        {/* FLEX ROW - Brand LEFT | About+Shop CENTER | Newsletter RIGHT */}
        <div className="flex justify-between items-start">

          {/* COLUMN 1: Brand - LEFT EXTREME */}
          <div className="w-[350px]">
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Elevate your living spaces with our thoughtfully curated collection of timeless home décor.
              From elegant statement pieces to subtle everyday accents, each design blends
              craftsmanship, comfort, and style helping you create interiors that feel warm, personal, and effortlessly refined.
            </p>
            <h2 className="text-2xl font-bold mb-4 tracking-widest">gAI DECOR</h2>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* MIDDLE: About + Shop CLOSE TOGETHER */}
          <div className="flex gap-16">

            {/* COLUMN 2: About */}
            <div>
              <Link to="/about" className="text-sm font-semibold mb-4 block hover:text-gray-300 transition">ABOUT</Link>
              <div className="flex flex-col gap-3">
                <Link to="/about#our-story" className="text-sm text-gray-400 hover:text-white transition">Our Story</Link>
                <Link to="/about#about-us" className="text-sm text-gray-400 hover:text-white transition">About Us</Link>
                <Link to="/about#contact" className="text-sm text-gray-400 hover:text-white transition">Contact</Link>
                <Link to="/about#faqs" className="text-sm text-gray-400 hover:text-white transition">FAQs</Link>
              </div>
            </div>

            {/* COLUMN 3: Shop */}
            <div>
              <h3 className="text-sm font-semibold mb-4">SHOP</h3>
              <div className="flex flex-col gap-3">
                <Link to="/category/furniture" className="text-sm text-gray-400 hover:text-white transition">Furniture</Link>
                <Link to="/category/rugs" className="text-sm text-gray-400 hover:text-white transition">Rugs</Link>
                <Link to="/category/lighting" className="text-sm text-gray-400 hover:text-white transition">Lighting</Link>
                <Link to="/category/decor" className="text-sm text-gray-400 hover:text-white transition">Decor</Link>
                <Link to="/category/art" className="text-sm text-gray-400 hover:text-white transition">Art</Link>
              </div>
            </div>

          </div>

          {/* COLUMN 4: Newsletter - RIGHT EXTREME */}
          <div className="w-[320px]">
            <h3 className="text-sm font-semibold mb-4">NEWSLETTER</h3>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Get exclusive offers!
            </p>
            <form className="space-y-3">
              <Input
                type="email"
                placeholder="Your email"
                className="h-11 bg-white text-black placeholder:text-gray-500"
              />
              <Button
                type="submit"
                className="w-full h-11 bg-white hover:bg-gray-100 text-black font-medium"
              >
                SUBSCRIBE
              </Button>
            </form>
          </div>

        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="border-t border-gray-800">
        <div className="max-w-screen-2xl mx-auto px-12 py-6">

          {/* Payment Cards */}
          <div className="flex justify-end mb-6 gap-2">
            <div className="h-8 w-12 bg-white rounded flex items-center justify-center text-xs font-bold text-black">VISA</div>
            <div className="h-8 w-12 bg-white rounded flex items-center justify-center text-xs font-bold text-black">MC</div>
            <div className="h-8 w-12 bg-white rounded flex items-center justify-center text-xs font-bold text-black">AMEX</div>
          </div>

          {/* Copyright & Links */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">© 2026 gAI DECOR</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-white transition">Privacy</Link>
              <Link to="/terms" className="text-sm text-gray-500 hover:text-white transition">Terms</Link>
            </div>
          </div>

        </div>
      </div>

    </footer>
  );
}
