import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useCartDrawerStore } from '@/store/useCartDrawerStore';
import { useRecentlyViewedStore } from '@/store/useRecentlyViewedStore';
import {
  getProductById,
  getSimilarProducts,
  getDefaultRecentlyViewed,
} from '@/services/productService';

// Color mapping for swatches
const colorMap: Record<string, string> = {
  'Navy Blue': '#1e3a5f',
  'Emerald Green': '#046307',
  'Blush Pink': '#f4c2c2',
  'Charcoal Gray': '#36454f',
  'Light Gray': '#d3d3d3',
  'Charcoal': '#36454f',
  'Beige': '#f5f5dc',
  'Navy': '#000080',
  'Emerald': '#50c878',
  'Walnut': '#5d432c',
  'Natural Oak': '#d4a574',
  'White Oak': '#e8dcc4',
  'Black': '#000000',
  'White': '#ffffff',
  'Gray': '#808080',
  'Brown': '#8b4513',
  'Cream': '#fffdd0',
  'Gold': '#ffd700',
  'Silver': '#c0c0c0',
  'Bronze': '#cd7f32',
  'Copper': '#b87333',
  'Brass': '#b5a642',
  'Ivory': '#fffff0',
  'Taupe': '#483c32',
  'Sage': '#9dc183',
  'Terracotta': '#e2725b',
  'Rust': '#b7410e',
  'Burgundy': '#800020',
  'Mustard': '#ffdb58',
  'Teal': '#008080',
  'Coral': '#ff7f50',
  'Mint': '#98ff98',
  'Lavender': '#e6e6fa',
  'Gray/Cream': '#d3d3d3',
  'Natural': '#d4a574',
  'Oak': '#c4a35a',
  'Pink': '#ffc0cb',
  'Blue': '#4169e1',
  'Cognac': '#9a463d',
  'Clear': '#e0e0e0',
  'Espresso': '#3c2415',
  'Red': '#dc143c',
  'Orange': '#ff8c00',
  'Yellow': '#ffd700',
  'Green': '#228b22',
  'Purple': '#800080',
  'Multi': '#888888',
};

// Accordion sections configuration
const accordionSections = [
  { id: 'description', label: 'DESCRIPTION' },
  { id: 'shipping', label: 'SHIPPING & RETURNS' },
  { id: 'details', label: 'DETAILS & DIMENSIONS' },
  { id: 'care', label: 'CARE INSTRUCTIONS' },
  { id: 'reviews', label: 'REVIEWS' },
];

// Product Description Box Component with expand/collapse
function ProductDescriptionBox({ product }: { product: any }) {
  const [expanded, setExpanded] = useState(false);

  // Get enriched descriptions if available, fallback to original
  const shortDesc = product.enrichedDescription?.short || product.description || '';
  const longDesc = product.enrichedDescription?.long || '';

  if (!shortDesc && !longDesc) return null;

  return (
    <div className="bg-[#f5f5f5] p-8 mb-10">
      <p className="text-base text-gray-700 leading-relaxed">
        {expanded && longDesc ? longDesc : shortDesc}
      </p>
      {longDesc && longDesc !== shortDesc && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-gray-600 underline mt-4"
        >
          {expanded ? 'see less' : 'see more'}
        </button>
      )}
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const { openDrawer } = useCartDrawerStore();

  // Recently viewed store
  const addToRecentlyViewed = useRecentlyViewedStore((state) => state.addProduct);
  const getRecentlyViewed = useRecentlyViewedStore((state) => state.getRecentlyViewed);

  // Find product using productService
  const product = id ? getProductById(id) : undefined;

  const [selectedColor, setSelectedColor] = useState(product?.attributes?.color?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.attributes?.size || '');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  // For sticky behavior tracking
  const rightSectionRef = useRef<HTMLDivElement>(null);

  // Use product images from the service (already has local paths)
  const productImages = product?.images || [];

  // Reset state when product changes and track recently viewed
  useEffect(() => {
    if (product) {
      setSelectedColor(product.attributes.color?.[0] || '');
      setSelectedSize(product.attributes.size || '');
      setSelectedImageIndex(0);
      setQuantity(1);

      // Add this product to recently viewed
      addToRecentlyViewed({
        id: product.id,
        name: product.name,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        primaryImage: product.primaryImage,
      });
    }
  }, [product?.id, addToRecentlyViewed]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-gray-900 text-white text-sm"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Get similar products using productService
  const similarProducts = getSimilarProducts(product.id, 10);

  // Get recently viewed products from store, excluding current product
  const storedRecentlyViewed = getRecentlyViewed(5, product.id);

  // Always show 5 items: fill with defaults if user hasn't viewed enough
  const recentlyViewedProducts = (() => {
    const recentIds = new Set(storedRecentlyViewed.map(p => p.id));

    // Get MORE defaults (8) so we have enough after filtering out current product
    const defaults = getDefaultRecentlyViewed(8)
      .filter(p => p.id !== product.id && !recentIds.has(p.id));

    // Combine: recent first, then fill with defaults up to 5
    const needed = 5 - storedRecentlyViewed.length;
    const fillerDefaults = defaults.slice(0, needed).map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      compareAtPrice: p.compareAtPrice,
      primaryImage: p.primaryImage,
      viewedAt: 0, // Mark as default (not actually viewed)
    }));

    return [...storedRecentlyViewed, ...fillerDefaults];
  })();

  const handleAddToCart = () => {
    const cartProduct = {
      id: product.id,
      name: product.name,
      brand: product.taxonomy.category.name,
      category: product.taxonomy.category.name,
      price: product.price,
      originalPrice: product.compareAtPrice,
      rating: product.metadata.rating || 0,
      reviewCount: product.metadata.reviewCount || 0,
      description: product.description || '',
      features: [],
      images: productImages,
      colors: product.attributes.color || [],
      sizes: product.attributes.size ? [product.attributes.size] : [],
      inStock: product.metadata.inStock,
    };
    addItem(cartProduct as any, quantity, selectedColor || undefined, selectedSize || undefined);
    openDrawer();
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handlePrevImage = () => {
    setSelectedImageIndex(prev => prev === 0 ? productImages.length - 1 : prev - 1);
  };

  const handleNextImage = () => {
    setSelectedImageIndex(prev => prev === productImages.length - 1 ? 0 : prev + 1);
  };

  // Get category path for breadcrumb
  const categorySlug = product.taxonomy.category.slug;
  const categoryName = product.taxonomy.category.name;
  const subcategoryName = product.taxonomy.subcategory?.name || '';

  return (
    <div className="bg-white">
      {/* UPPER SECTION - Split View */}
      <div className="flex">
        {/* LEFT SIDE - Sticky Image Gallery (50% width) */}
        <div className="w-1/2">
          <div className="sticky top-0 h-screen flex flex-col pt-8">
            {/* Main Image - smaller height */}
            <div className="relative bg-white flex items-center justify-center px-6" style={{ height: 'calc(100vh - 200px)' }}>
              <img
                src={productImages[selectedImageIndex]}
                alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />

              {/* Navigation Arrows */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white flex items-center justify-center transition-all rounded-full shadow-md"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white flex items-center justify-center transition-all rounded-full shadow-md"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Thumbnail Strip - no gap from main image */}
            <div className="bg-white px-4 py-3">
              <div className="flex gap-2 justify-center">
                {productImages.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-16 h-16 bg-white overflow-hidden border transition-all ${
                      index === selectedImageIndex
                        ? 'border-gray-900'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Scrollable Product Info (50% width) */}
        <div className="w-1/2" ref={rightSectionRef}>
          <div className="px-12 pt-4 pb-10">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-6 uppercase tracking-wider">
              <Link to="/" className="hover:text-gray-900">HOME</Link>
              <span className="mx-2">/</span>
              <Link to={`/category/${categorySlug}`} className="hover:text-gray-900">
                ALL {categoryName.toUpperCase()}
              </Link>
              {subcategoryName && (
                <>
                  <span className="mx-2">/</span>
                  <span className="text-gray-900">{subcategoryName.toUpperCase()}</span>
                </>
              )}
            </nav>

            {/* Product Title */}
            <h1 className="text-2xl font-medium text-gray-900 uppercase tracking-wide mb-4 leading-tight">
              {product.name}
            </h1>

            {/* SKU */}
            <p className="text-sm text-gray-400 mb-6">SKU: {product.sku}</p>

            {/* Price & Reviews */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-medium text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-base text-gray-400 line-through">
                    ${product.compareAtPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <button className="text-sm text-gray-500 underline uppercase tracking-wider">
                Write a Review
              </button>
            </div>

            {/* Color Selector */}
            {product.attributes.color && product.attributes.color.length > 0 && (
              <div className="mb-8">
                <div className="text-sm text-gray-600 uppercase tracking-wider mb-4">
                  Select Color: <span className="text-gray-900 font-medium">{selectedColor}</span>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {product.attributes.color.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 border-2 transition-all ${
                        selectedColor === color
                          ? 'border-gray-900 ring-1 ring-gray-900 ring-offset-1'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: colorMap[color] || '#ccc' }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Material & Style - Combined row */}
            {(product.attributes.material?.length || product.attributes.style?.length) && (
              <div className="mb-8">
                <div className="text-sm text-gray-600 uppercase tracking-wider mb-4">
                  {product.attributes.material?.length ? 'Material' : 'Style'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.attributes.material?.map((material) => (
                    <span
                      key={material}
                      className="px-5 py-2.5 text-sm border border-gray-300 text-gray-700"
                    >
                      {material}
                    </span>
                  ))}
                  {product.attributes.style?.map((style) => (
                    <span
                      key={style}
                      className="px-5 py-2.5 text-sm border border-gray-300 text-gray-700"
                    >
                      {style}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector (for bedding/rugs) */}
            {product.attributes.size && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600 uppercase tracking-wider">
                    Size: <span className="text-gray-900 font-medium">{selectedSize}</span>
                  </span>
                  <button className="text-sm text-gray-500 underline uppercase tracking-wider">
                    Size Guide
                  </button>
                </div>
                <div className="px-5 py-2.5 text-sm border border-gray-900 bg-gray-900 text-white inline-block">
                  {product.attributes.size}
                </div>
              </div>
            )}

            {/* Quantity & Add to Bag */}
            <div className="flex gap-4 mb-10">
              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-300">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-14 h-14 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-5 h-5 text-gray-600" />
                </button>
                <span className="w-14 h-14 flex items-center justify-center text-base font-medium border-x border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-14 h-14 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAddToCart}
                disabled={!product.metadata.inStock}
                className="flex-1 h-14 bg-gray-900 text-white text-base font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors disabled:bg-gray-400"
              >
                {product.metadata.inStock ? 'Add to Bag' : 'Out of Stock'}
              </button>
            </div>

            {/* Product Description - Gray box like reference */}
            <ProductDescriptionBox product={product} />

            {/* Accordion Sections */}
            <div className="mb-12">
              {accordionSections.map((section, idx) => (
                <div key={section.id} className={`border-t border-gray-200 ${idx === accordionSections.length - 1 ? 'border-b' : ''}`}>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between py-6 text-sm font-medium text-gray-900 uppercase tracking-wider"
                  >
                    <span>{section.label}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${expandedSections.includes(section.id) ? 'rotate-180' : ''}`} />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedSections.includes(section.id)
                        ? 'max-h-96 opacity-100 pb-5'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="text-base text-gray-600">
                      {section.id === 'description' && (
                        <div>
                          <p className="mb-3">
                            {(product as any).enrichedDescription?.long || product.description || 'No description available.'}
                          </p>
                        </div>
                      )}
                      {section.id === 'shipping' && (
                        <div>
                          <p className="mb-2">Free standard shipping on orders over $50.</p>
                          <p className="mb-2">Delivery within 5-7 business days.</p>
                          <p>30-day return policy for unused items in original packaging.</p>
                        </div>
                      )}
                      {section.id === 'details' && (
                        <div>
                          <p className="mb-2">SKU: {product.sku}</p>
                          <p className="mb-2">Category: {categoryName}</p>
                          <p className="mb-2">Subcategory: {subcategoryName}</p>
                          {product.attributes.color && <p className="mb-2">Available Colors: {product.attributes.color.join(', ')}</p>}
                          {product.attributes.material && <p className="mb-2">Materials: {product.attributes.material.join(', ')}</p>}
                          {product.attributes.style && <p className="mb-2">Style: {product.attributes.style.join(', ')}</p>}
                        </div>
                      )}
                      {section.id === 'care' && (
                        <div>
                          <p>{(product as any).enrichedDescription?.careInstructions || 'Clean with a damp cloth. Avoid direct sunlight to prevent fading. Professional cleaning recommended for deep stains.'}</p>
                        </div>
                      )}
                      {section.id === 'reviews' && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="font-medium">{(product.metadata.rating || 0).toFixed(1)}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < Math.floor(product.metadata.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}>
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="text-gray-500">({product.metadata.reviewCount || 0} reviews)</span>
                          </div>
                          <button className="text-xs text-gray-900 underline uppercase tracking-wide">
                            Read All Reviews
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Video Section */}
            <div className="mt-8">
              <video
                className="w-full aspect-video object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/src/assets/videos/sofa.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>

      {/* LOWER SECTION - Full Width */}
      <div className="bg-white">
        {/* Similar Style Section */}
        {similarProducts.length > 0 && (
          <div className="py-16">
            <h2 className="text-center text-lg font-normal text-gray-900 uppercase tracking-[0.2em] mb-12">
              Similar Style
            </h2>
            <div
              className="px-16 overflow-x-scroll scrollbar-hide"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <div className="flex gap-4" style={{ width: 'max-content' }}>
                {similarProducts.map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="group flex-shrink-0"
                    style={{ width: 'calc((100vw - 128px - 64px) / 5)' }}
                  >
                    <div className="aspect-square bg-white mb-4 overflow-hidden">
                      <img
                        src={item.primaryImage}
                        alt={item.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-sm text-gray-900 mb-2 line-clamp-2 leading-snug">{item.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-900">${item.price.toFixed(2)}</span>
                      {item.compareAtPrice && (
                        <span className="text-sm text-gray-400 line-through">${item.compareAtPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Recently Viewed Section */}
        {recentlyViewedProducts.length > 0 && (
          <div className="py-16">
            <h2 className="text-center text-lg font-normal text-gray-900 uppercase tracking-[0.2em] mb-12">
              Recently Viewed
            </h2>
            <div className="px-16">
              <div className="grid grid-cols-5 gap-4">
                {recentlyViewedProducts.map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="group"
                  >
                    <div className="aspect-square bg-white mb-4 overflow-hidden">
                      <img
                        src={item.primaryImage}
                        alt={item.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-sm text-gray-900 mb-2 line-clamp-2 leading-snug">{item.name}</h3>
                    <span className="text-sm text-gray-900">${item.price.toFixed(2)}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
