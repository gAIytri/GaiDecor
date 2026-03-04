/**
 * Auth API Service
 * POST /auth/login, POST /auth/register, POST /auth/refresh
 */

import apiClient from './client';
import { mapApiUser } from './mappers';
import type { User } from '@/types';
import type { ApiAuthResponse } from '@/types/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
}

export interface AuthResult {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

function mapAuthResponse(data: ApiAuthResponse): AuthResult {
  return {
    user: mapApiUser(data.user),
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
  };
}

export async function login(credentials: LoginCredentials): Promise<AuthResult> {
  const { data } = await apiClient.post<ApiAuthResponse>('/auth/login', credentials);
  return mapAuthResponse(data);
}

export async function register(payload: RegisterPayload): Promise<AuthResult> {
  const { data } = await apiClient.post<ApiAuthResponse>('/auth/register', payload);
  return mapAuthResponse(data);
}

export async function refreshToken(token: string): Promise<AuthResult> {
  const { data } = await apiClient.post<ApiAuthResponse>('/auth/refresh', {
    refresh_token: token,
  });
  return mapAuthResponse(data);
}
