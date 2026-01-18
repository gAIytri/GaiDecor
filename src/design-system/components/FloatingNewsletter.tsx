/**
 * FloatingNewsletter Component
 * A centered modal popup newsletter subscription form that appears on scroll
 * Features:
 * - Two-column layout (image left + form right)
 * - Light elegant design with cream/beige background
 * - Centered modal with backdrop
 * - Dismissible with close button
 */

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Box } from '../primitives/Box';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import newsletterImage from '@/assets/landingbg/5.jpg';

export interface FloatingNewsletterProps {
  /** Title text */
  title?: string;
  /** Subtitle text */
  subtitle?: string;
  /** Description text */
  description?: string;
  /** Scroll distance before showing (in pixels) */
  scrollThreshold?: number;
  /** Delay before showing (in milliseconds) */
  showDelay?: number;
}

const NEWSLETTER_STORAGE_KEY = 'newsletter-dismissed';
const NEWSLETTER_COOLDOWN_HOURS = 24; // Don't show again for 24 hours after dismissing

export function FloatingNewsletter({
  title = 'Join us',
  subtitle = 'Get 15% off',
  description = 'Sign up for 15% off your first order, plus early access to new arrivals and exclusive offers.',
  scrollThreshold = 300,
  showDelay = 2000,
}: FloatingNewsletterProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(() => {
    // Check localStorage on initial load
    const stored = localStorage.getItem(NEWSLETTER_STORAGE_KEY);
    if (stored) {
      const dismissedTime = parseInt(stored, 10);
      const hoursSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60);
      // If less than cooldown period, keep it dismissed
      return hoursSinceDismissed < NEWSLETTER_COOLDOWN_HOURS;
    }
    return false;
  });
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(() => {
    // Check if user already subscribed
    return localStorage.getItem('newsletter-subscribed') === 'true';
  });
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed, submitted, or already triggered this session
    if (isDismissed || isSubmitted || hasTriggered) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      if (window.scrollY > scrollThreshold && !hasTriggered) {
        // Show after delay on first scroll past threshold
        if (!timeoutId) {
          timeoutId = setTimeout(() => {
            setIsVisible(true);
            setHasTriggered(true); // Only trigger once per session
          }, showDelay);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [scrollThreshold, showDelay, isDismissed, isSubmitted, hasTriggered]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    setIsDismissed(true);
    // Save to localStorage so it doesn't show again for 24 hours
    localStorage.setItem(NEWSLETTER_STORAGE_KEY, Date.now().toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Add actual submission logic
    console.log('Newsletter subscription:', email);

    setIsSubmitted(true);
    setEmail('');
    // Mark as subscribed permanently
    localStorage.setItem('newsletter-subscribed', 'true');

    // Close popup after 2 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <Box
        onClick={handleClose}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9998
        }}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          animation: 'fadeIn 0.3s ease-out',
        }}
      />

      {/* Modal - 20% larger (750 -> 900) */}
      <div
        className="fixed rounded-lg shadow-2xl overflow-hidden"
        style={{
          top: '50%',
          left: '50%',
          width: 'min(90vw, 900px)',
          maxWidth: '900px',
          maxHeight: '90vh',
          transform: 'translate(-50%, -50%)',
          animation: 'scaleIn 0.3s ease-out',
          zIndex: 9999,
          backgroundColor: '#ffffff',
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 z-10 h-6 w-6 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Two Column Layout - 20% larger (450 -> 540) */}
        <div className="flex flex-col md:flex-row" style={{ minHeight: '540px' }}>
          {/* Left Column - Image */}
          <div className="hidden md:block md:w-[45%] relative">
            <img
              src={newsletterImage}
              alt="Newsletter"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Column - Form */}
          <div
            className="flex-1 p-8 md:p-10 lg:p-12 flex flex-col justify-center"
            style={{ backgroundColor: '#ffffff' }}
          >
            {/* Subtitle */}
            <p className="text-xs font-medium tracking-widest uppercase text-gray-500 mb-2">
              {subtitle}
            </p>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-4">
              {title}
            </h2>

            {/* Description */}
            <p className="text-sm md:text-base text-gray-500 mb-8 leading-relaxed">
              {description}
            </p>

            {/* Form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-green-600 focus:ring-green-600"
                  />
                  <Button
                    type="submit"
                    className="w-full h-12 bg-[#5c8a6b] hover:bg-[#4a7c59] text-white font-medium rounded-md transition-colors"
                  >
                    Join us
                  </Button>
                </div>

                {/* Privacy text */}
                <p className="text-xs text-gray-400 mt-4 text-center">
                  By subscribing you agree to our{' '}
                  <a href="/privacy" className="underline hover:text-gray-600">
                    Privacy Policy
                  </a>
                </p>
              </form>
            ) : (
              <div className="p-6 rounded-md text-center bg-[#4a7c59]">
                <p className="text-base font-medium text-white">
                  Thank you for subscribing!
                </p>
                <p className="text-sm text-white mt-1 opacity-90">
                  Check your inbox for your 15% off code.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </>
  );
}

export default FloatingNewsletter;
