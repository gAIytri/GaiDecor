/**
 * Checkout Page
 * 3-step flow: Shipping → Payment → Review
 * Uses useCheckoutStore + useCartStore for state management.
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Check, CreditCard, Truck, ClipboardList } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useCheckoutStore } from '@/store/useCheckoutStore';
import { cn } from '@/lib/utils';

const STEPS = [
  { key: 'shipping' as const, label: 'Shipping', icon: Truck },
  { key: 'payment' as const, label: 'Payment', icon: CreditCard },
  { key: 'review' as const, label: 'Review', icon: ClipboardList },
];

const SHIPPING_METHODS = [
  { id: 'standard', name: 'Standard Shipping', description: '5–7 business days', price: 0 },
  { id: 'express', name: 'Express Shipping', description: '2–3 business days', price: 14.99 },
  { id: 'overnight', name: 'Overnight Shipping', description: 'Next business day', price: 29.99 },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, tax, shipping, total, clearCart } = useCartStore();
  const { step, setStep, nextStep, prevStep, isProcessing, setProcessing, reset } =
    useCheckoutStore();

  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [formData, setFormData] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    street: '742 Evergreen Terrace',
    city: 'Portland',
    state: 'OR',
    zip: '97201',
    phone: '(555) 123-4567',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const stepIndex = STEPS.findIndex((s) => s.key === step);

  // Redirect to cart if empty
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-medium text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Add items to your cart before checking out.</p>
        <Link
          to="/"
          className="px-8 py-3 bg-gray-900 text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setProcessing(true);
    // Simulate order placement
    setTimeout(() => {
      const orderNumber = `ORD-2026-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`;
      clearCart();
      reset();
      setProcessing(false);
      navigate(`/order-confirmation/${orderNumber}`);
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const shippingCost = SHIPPING_METHODS.find((m) => m.id === selectedShipping)?.price ?? 0;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-8 lg:py-12">
        {/* Header */}
        <h1 className="text-2xl lg:text-3xl font-medium text-gray-900 uppercase tracking-[0.15em] mb-10">
          Checkout
        </h1>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10 lg:mb-14">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isCompleted = i < stepIndex;
            const isActive = i === stepIndex;
            return (
              <div key={s.key} className="flex items-center gap-2">
                <button
                  onClick={() => isCompleted && setStep(s.key)}
                  disabled={!isCompleted}
                  className={cn(
                    'w-9 h-9 rounded-full flex items-center justify-center transition-all',
                    isCompleted
                      ? 'bg-emerald-600 text-white cursor-pointer hover:bg-emerald-700'
                      : isActive
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-200 text-gray-400'
                  )}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </button>
                <span
                  className={cn(
                    'text-sm font-medium hidden sm:block',
                    isActive ? 'text-gray-900' : isCompleted ? 'text-emerald-600' : 'text-gray-400'
                  )}
                >
                  {s.label}
                </span>
                {i < STEPS.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-gray-300 hidden sm:block" />
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Main Form Area */}
          <div className="flex-1">
            {/* Step 1: Shipping */}
            {step === 'shipping' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Shipping Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'firstName', label: 'First Name', span: 1 },
                    { id: 'lastName', label: 'Last Name', span: 1 },
                    { id: 'street', label: 'Street Address', span: 2 },
                    { id: 'city', label: 'City', span: 1 },
                    { id: 'state', label: 'State', span: 1 },
                    { id: 'zip', label: 'ZIP Code', span: 1 },
                    { id: 'phone', label: 'Phone', span: 1 },
                  ].map((field) => (
                    <div key={field.id} className={field.span === 2 ? 'sm:col-span-2' : ''}>
                      <label
                        htmlFor={field.id}
                        className="block text-sm text-gray-600 mb-1"
                      >
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        type="text"
                        value={formData[field.id as keyof typeof formData]}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-gray-500 transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <h3 className="text-lg font-medium text-gray-900 mt-10 mb-4">Shipping Method</h3>
                <div className="space-y-3">
                  {SHIPPING_METHODS.map((method) => (
                    <label
                      key={method.id}
                      className={cn(
                        'flex items-center justify-between p-4 border cursor-pointer transition-colors',
                        selectedShipping === method.id
                          ? 'border-emerald-600 bg-emerald-50/30'
                          : 'border-gray-200 hover:border-gray-300'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value={method.id}
                          checked={selectedShipping === method.id}
                          onChange={() => setSelectedShipping(method.id)}
                          className="accent-emerald-600"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{method.name}</p>
                          <p className="text-xs text-gray-500">{method.description}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {method.price === 0 ? 'Free' : `$${method.price.toFixed(2)}`}
                      </span>
                    </label>
                  ))}
                </div>

                <button
                  onClick={nextStep}
                  className="mt-10 w-full py-4 bg-gray-900 text-white text-sm font-medium uppercase tracking-[0.15em] hover:bg-gray-800 transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 'payment' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Payment</h2>
                <div className="border border-gray-200 p-6 lg:p-8">
                  <p className="text-xs text-gray-400 mb-6 uppercase tracking-wider">
                    Stripe Elements will be integrated in WS-6
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm text-gray-600 mb-1">
                        Card Number
                      </label>
                      <input
                        id="cardNumber"
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-gray-500 transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="block text-sm text-gray-600 mb-1">
                          Expiry
                        </label>
                        <input
                          id="expiry"
                          type="text"
                          placeholder="MM / YY"
                          value={formData.expiry}
                          onChange={(e) => handleInputChange('expiry', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-gray-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="cvc" className="block text-sm text-gray-600 mb-1">
                          CVC
                        </label>
                        <input
                          id="cvc"
                          type="text"
                          placeholder="123"
                          value={formData.cvc}
                          onChange={(e) => handleInputChange('cvc', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-gray-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-10">
                  <button
                    onClick={prevStep}
                    className="flex-1 py-4 border border-gray-300 text-gray-900 text-sm font-medium uppercase tracking-wider hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="flex-1 py-4 bg-gray-900 text-white text-sm font-medium uppercase tracking-[0.15em] hover:bg-gray-800 transition-colors"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 'review' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Review Your Order</h2>

                {/* Shipping Info Summary */}
                <div className="border border-gray-200 p-5 mb-6">
                  <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
                    Shipping To
                  </h3>
                  <p className="text-sm text-gray-900">
                    {formData.firstName} {formData.lastName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formData.street}, {formData.city}, {formData.state} {formData.zip}
                  </p>
                </div>

                {/* Items */}
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-20 bg-gray-100 flex-shrink-0 flex items-center justify-center">
                        {typeof item.product.images[0] === 'string' &&
                        item.product.images[0].length > 10 ? (
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <span className="text-3xl">{item.product.images[0]}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.selectedColor} · Qty {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 mt-10">
                  <button
                    onClick={prevStep}
                    className="flex-1 py-4 border border-gray-300 text-gray-900 text-sm font-medium uppercase tracking-wider hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className={cn(
                      'flex-1 py-4 text-white text-sm font-medium uppercase tracking-[0.15em] transition-colors',
                      isProcessing
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-emerald-600 hover:bg-emerald-700'
                    )}
                  >
                    {isProcessing ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-[380px] lg:flex-shrink-0">
            <div className="lg:sticky lg:top-28 bg-[#f8f8f8] p-6 lg:p-8">
              <h2 className="text-base font-medium text-gray-900 uppercase tracking-[0.12em] mb-4">
                Order Summary
              </h2>

              <hr className="border-t border-gray-300 mb-5" />

              <div className="space-y-3 text-sm">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-gray-600 truncate mr-4">
                      {item.product.name} ×{item.quantity}
                    </span>
                    <span className="text-gray-900 font-medium flex-shrink-0">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <hr className="border-t border-gray-300 my-5" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${subtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">${tax().toFixed(2)}</span>
                </div>
              </div>

              <hr className="border-t border-gray-300 my-5" />

              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-gray-900 uppercase tracking-wider">
                  Total
                </span>
                <span className="text-xl font-medium text-gray-900">
                  ${(subtotal() + shippingCost + tax()).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
