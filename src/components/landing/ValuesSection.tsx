/**
 * ValuesSection Component
 * Showcases company values with scroll-triggered content
 * Left: Images scroll, Right: Text changes based on scroll position
 */

import { ScrollTriggerSection, type ScrollTriggerItem } from '@/design-system';

// Import value images
import value1 from '@/assets/designs/bohemian/julien-lanoy-jV5Jqlgp4h0-unsplash.jpg';
import value2 from '@/assets/designs/coastal/Coastal-Outdoor-Furniture-Chairs-Chat-Set-5781.jpg';
import value3 from '@/assets/designs/minimalist/alexandra-gorn-W5dsm9n6e3g-unsplash.jpg';

const valuesData: ScrollTriggerItem[] = [
  {
    image: value1,
    label: 'OUR VALUES',
    title: 'Sustainability With Purpose',
    description:
      'We thoughtfully source materials and partner responsibly, striving to reduce waste and create products that respect the environment without compromising design or quality.',
  },
  {
    image: value2,
    label: 'OUR VALUES',
    title: 'Comfort Comes First',
    description:
      'Our designs prioritize real living—creating furniture and décor that feel inviting, supportive, and effortless to use throughout your daily routines.',
  },
  {
    image: value3,
    label: 'OUR VALUES',
    title: 'Timeless Over Trendy',
    description:
      'We believe in styles that age gracefully, avoiding short-lived trends in favor of enduring design that remains relevant, elegant, and meaningful over time.',
  },
];

export default function ValuesSection() {
  return <ScrollTriggerSection items={valuesData} imageHeight="700px" />;
}
