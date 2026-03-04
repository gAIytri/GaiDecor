import { create } from 'zustand';
import type { Address, ShippingMethod } from '@/types';

type CheckoutStep = 'shipping' | 'payment' | 'review';

interface CheckoutStore {
  step: CheckoutStep;
  shippingAddress: Address | null;
  shippingMethod: ShippingMethod | null;
  paymentMethodId: string | null;
  isProcessing: boolean;
  error: string | null;

  setStep: (step: CheckoutStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  setShippingAddress: (address: Address) => void;
  setShippingMethod: (method: ShippingMethod) => void;
  setPaymentMethodId: (id: string) => void;
  setProcessing: (processing: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const STEPS: CheckoutStep[] = ['shipping', 'payment', 'review'];

const initialState = {
  step: 'shipping' as CheckoutStep,
  shippingAddress: null,
  shippingMethod: null,
  paymentMethodId: null,
  isProcessing: false,
  error: null,
};

export const useCheckoutStore = create<CheckoutStore>((set, get) => ({
  ...initialState,

  setStep: (step) => set({ step, error: null }),

  nextStep: () => {
    const idx = STEPS.indexOf(get().step);
    if (idx < STEPS.length - 1) {
      set({ step: STEPS[idx + 1], error: null });
    }
  },

  prevStep: () => {
    const idx = STEPS.indexOf(get().step);
    if (idx > 0) {
      set({ step: STEPS[idx - 1], error: null });
    }
  },

  setShippingAddress: (address) => set({ shippingAddress: address }),
  setShippingMethod: (method) => set({ shippingMethod: method }),
  setPaymentMethodId: (id) => set({ paymentMethodId: id }),
  setProcessing: (processing) => set({ isProcessing: processing }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
}));
