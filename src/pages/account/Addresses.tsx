/**
 * Addresses Page — account sub-page
 * Lists user addresses with edit / set-default / delete actions.
 */

import { useAuthStore } from '@/store/useAuthStore';

export default function Addresses() {
  const user = useAuthStore((s) => s.user);
  const { removeAddress, setDefaultAddress } = useAuthStore();

  const addresses = user?.addresses ?? [
    {
      id: 'addr-1',
      label: 'Home',
      firstName: 'Sarah',
      lastName: 'Johnson',
      street1: '742 Evergreen Terrace',
      street2: '',
      city: 'Portland',
      state: 'OR',
      zipCode: '97201',
      country: 'US',
      phone: '(555) 123-4567',
      isDefault: true,
    },
    {
      id: 'addr-2',
      label: 'Office',
      firstName: 'Sarah',
      lastName: 'Johnson',
      street1: '1600 Pennsylvania Ave NW',
      street2: 'Suite 200',
      city: 'Washington',
      state: 'DC',
      zipCode: '20500',
      country: 'US',
      phone: '(555) 987-6543',
      isDefault: false,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">Addresses</h2>
        <button className="px-4 py-2 border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
          Add Address
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div key={addr.id} className="border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-gray-900">{addr.label}</span>
              {addr.isDefault && (
                <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-700 font-medium uppercase tracking-wide">
                  Default
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">
              {addr.firstName} {addr.lastName}
            </p>
            <p className="text-sm text-gray-600">{addr.street1}</p>
            {addr.street2 && <p className="text-sm text-gray-600">{addr.street2}</p>}
            <p className="text-sm text-gray-600">
              {addr.city}, {addr.state} {addr.zipCode}
            </p>
            <p className="text-sm text-gray-600">{addr.phone}</p>

            <div className="flex gap-4 mt-4">
              <button className="text-xs text-gray-500 underline hover:text-gray-900 transition-colors">
                Edit
              </button>
              {!addr.isDefault && (
                <button
                  onClick={() => setDefaultAddress(addr.id)}
                  className="text-xs text-gray-500 underline hover:text-gray-900 transition-colors"
                >
                  Set as default
                </button>
              )}
              <button
                onClick={() => removeAddress(addr.id)}
                className="text-xs text-red-500 underline hover:text-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
