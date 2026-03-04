/**
 * User API Service
 * GET/PATCH /users/me
 * GET/POST/PATCH/DELETE /users/me/addresses
 */

import apiClient from './client';
import { mapApiUser, mapApiAddress, addressToApi } from './mappers';
import type { User, Address } from '@/types';
import type { ApiUser, ApiAddress } from '@/types/api';

export async function fetchCurrentUser(): Promise<User> {
  const { data } = await apiClient.get<ApiUser>('/users/me');
  return mapApiUser(data);
}

export async function updateCurrentUser(updates: {
  first_name?: string;
  last_name?: string;
  phone?: string;
}): Promise<User> {
  const { data } = await apiClient.patch<ApiUser>('/users/me', updates);
  return mapApiUser(data);
}

export async function fetchAddresses(): Promise<Address[]> {
  const { data } = await apiClient.get<ApiAddress[]>('/users/me/addresses');
  return data.map(mapApiAddress);
}

export async function createAddress(address: Omit<Address, 'id'>): Promise<Address> {
  const { data } = await apiClient.post<ApiAddress>(
    '/users/me/addresses',
    addressToApi(address)
  );
  return mapApiAddress(data);
}

export async function updateAddress(
  addressId: string,
  updates: Partial<Omit<Address, 'id'>>
): Promise<Address> {
  const payload: Record<string, unknown> = {};
  if (updates.label !== undefined) payload.label = updates.label;
  if (updates.firstName !== undefined) payload.first_name = updates.firstName;
  if (updates.lastName !== undefined) payload.last_name = updates.lastName;
  if (updates.street1 !== undefined) payload.street1 = updates.street1;
  if (updates.street2 !== undefined) payload.street2 = updates.street2 || null;
  if (updates.city !== undefined) payload.city = updates.city;
  if (updates.state !== undefined) payload.state = updates.state;
  if (updates.zipCode !== undefined) payload.zip_code = updates.zipCode;
  if (updates.country !== undefined) payload.country = updates.country;
  if (updates.phone !== undefined) payload.phone = updates.phone;
  if (updates.isDefault !== undefined) payload.is_default = updates.isDefault;

  const { data } = await apiClient.patch<ApiAddress>(
    `/users/me/addresses/${addressId}`,
    payload
  );
  return mapApiAddress(data);
}

export async function deleteAddress(addressId: string): Promise<void> {
  await apiClient.delete(`/users/me/addresses/${addressId}`);
}

export async function setDefaultAddress(addressId: string): Promise<Address> {
  const { data } = await apiClient.patch<ApiAddress>(
    `/users/me/addresses/${addressId}/default`
  );
  return mapApiAddress(data);
}
