/**
 * About Page
 * Contains sections: Our Story, About Us, Contact, FAQs
 * Navigable from footer with anchor links to each section
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';

// Import images
import heroImage from '@/assets/landingbg/1.jpg';
import storyImage1 from '@/assets/landingbg/2.jpg';
import storyImage2 from '@/assets/landingbg/3.jpg';
import missionImage from '@/assets/landingbg/4.jpg';

// FAQ data
const faqs = [
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy on all items. Products must be in their original condition and packaging. Please contact our customer service team to initiate a return.'
  },
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping typically takes 5-7 business days. Express shipping options are available at checkout for faster delivery. Large furniture items may require additional time.'
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Currently, we ship within the continental United States. We are working on expanding our shipping options to include international destinations in the near future.'
  },
  {
    question: 'How do I track my order?',
    answer: 'Once your order ships, you will receive an email with tracking information. You can also log into your account to view your order status and tracking details.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Shop Pay. All transactions are securely processed.'
  },
  {
    question: 'Do you offer design consultation services?',
    answer: 'Yes! Our team of design experts is available for complimentary consultations. Contact us to schedule a virtual or in-person appointment to discuss your project.'
  },
  {
    question: 'How do I care for my furniture?',
    answer: 'Each product comes with specific care instructions. Generally, we recommend dusting regularly with a soft cloth and avoiding direct sunlight to preserve the finish.'
  },
  {
    question: 'Can I cancel or modify my order?',
    answer: 'Orders can be modified or cancelled within 24 hours of placement. After this window, please contact customer service and we will do our best to accommodate your request.'
  }
];

export default function About() {
  const location = useLocation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Scroll to section based on hash in URL
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HERO BANNER */}
      <section className="relative h-[50vh] overflow-hidden">
        <img
          src={heroImage}
          alt="About gAIytri"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-wide"
          >
            About gAIytri
          </motion.h1>
        </div>
      </section>

      {/* OUR STORY SECTION */}
      <section id="our-story" className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <img
                src={storyImage1}
                alt="Our Story"
                className="w-full h-[500px] object-cover"
              />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                OUR STORY
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                gAIytri was born from a simple belief: that beautiful, thoughtfully designed home furnishings should be accessible to everyone. Founded in 2020, we set out to bridge the gap between high-end design and everyday affordability.
              </p>
              <p className="text-gray-600 leading-relaxed">
                What started as a small collection of curated pieces has grown into a comprehensive destination for home decor enthusiasts. Every item in our collection is selected with care, combining timeless aesthetics with modern functionality to help you create spaces that truly feel like home.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT US / WHO WE ARE SECTION */}
      <section id="about-us" className="py-20 px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <img
                src={storyImage2}
                alt="Who We Are"
                className="w-full h-[500px] object-cover"
              />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                WHO WE ARE
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                <strong>gAIytri</strong> is a style-savvy collection of furniture, lighting, rugs, and home accents created with design enthusiasts in mind. Inspired by our love of iconic design styles, we've combined smart pricing with high-end finishes that elevate your space.
              </p>
              <p className="text-gray-600 leading-relaxed">
                You'll love how we've streamlined sourcing, from quality construction to eco-friendly packaging and fast, free delivery. Let gAIytri take your home from ordinary to extraordinary - whether that home is a Bohemian loft, modern farmhouse, or classic mid-century ranch.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* OUR MISSION SECTION */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <img
                src={missionImage}
                alt="Our Mission"
                className="w-full h-[500px] object-cover"
              />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                OUR MISSION
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our mission at gAIytri is to enhance the atmosphere of your home by providing high-quality, stylish furniture and decor at accessible prices.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe that great design has the power to transform not just spaces, but lives. That's why we're committed to offering a wide range of products - from sleek modern designs to classic timeless pieces - all crafted with attention to detail, quality, and sustainability.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 px-6 md:px-12 lg:px-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              GET IN TOUCH
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <p className="text-gray-400">support@gaidecor.com</p>
                  <p className="text-gray-400">sales@gaidecor.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Phone</h3>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                  <p className="text-gray-400 text-sm">Mon-Fri, 9am-6pm EST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Address</h3>
                  <p className="text-gray-400">123 Design District</p>
                  <p className="text-gray-400">New York, NY 10001</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/40"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/40"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/40"
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/40"
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/40 resize-none"
              />
              <button
                type="submit"
                className="w-full py-4 bg-white text-gray-900 font-medium uppercase tracking-wider hover:bg-gray-100 transition-colors"
              >
                Send Message
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faqs" className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-gray-600">
              Find answers to common questions about our products and services.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="border border-gray-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-900 font-medium pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
