/**
 * Profile Page — account sub-page
 * Displays and (mock) edits user profile info.
 */

import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

export default function Profile() {
  const user = useAuthStore((s) => s.user);
  const updateUser = useAuthStore((s) => s.updateUser);
  const [saved, setSaved] = useState(false);

  // Fallback mock data when not yet loaded
  const [form, setForm] = useState({
    firstName: user?.firstName ?? 'Sarah',
    lastName: user?.lastName ?? 'Johnson',
    email: user?.email ?? 'sarah@example.com',
    phone: user?.phone ?? '(555) 123-4567',
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    updateUser({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-6">Profile</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
        {[
          { id: 'firstName', label: 'First Name' },
          { id: 'lastName', label: 'Last Name' },
          { id: 'email', label: 'Email', type: 'email', span: 2 },
          { id: 'phone', label: 'Phone', span: 2 },
        ].map((field) => (
          <div key={field.id} className={field.span === 2 ? 'sm:col-span-2' : ''}>
            <label htmlFor={field.id} className="block text-sm text-gray-600 mb-1">
              {field.label}
            </label>
            <input
              id={field.id}
              type={field.type ?? 'text'}
              value={form[field.id as keyof typeof form]}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-gray-500 transition-colors"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="mt-6 px-8 py-3 bg-gray-900 text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
      >
        {saved ? 'Saved!' : 'Save Changes'}
      </button>
    </div>
  );
}
