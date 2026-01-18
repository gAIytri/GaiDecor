import { useEffect } from 'react';
import { useToastStore, type Toast as ToastType } from '@/store/useToastStore';

const Toast = ({ toast }: { toast: ToastType }) => {
  const removeToast = useToastStore((state) => state.removeToast);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, toast.duration || 3000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, removeToast]);

  return (
    <div
      className="
        bg-white border border-gray-200 rounded-lg shadow-sm
        px-4 py-3 min-w-[200px]
        animate-in slide-in-from-top-2 fade-in duration-200
      "
    >
      <p className="text-sm text-gray-900">{toast.message}</p>
    </div>
  );
};

export default function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-28 right-6 z-[100] pointer-events-none">
      <div className="flex flex-col gap-2 pointer-events-auto">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} />
        ))}
      </div>
    </div>
  );
}
