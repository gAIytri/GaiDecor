/**
 * API Client
 * Axios instance with JWT auth, session tracking, and error handling.
 */

import axios from 'axios';
import type { AxiosError } from 'axios';
import type { ApiError } from '@/types/api';
import { useAuthStore } from '@/store/useAuthStore';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// Request interceptor — attach JWT token + session ID
apiClient.interceptors.request.use((config) => {
  const { token, sessionId } = useAuthStore.getState();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (sessionId) {
    config.headers['x-session-id'] = sessionId;
  }

  return config;
});

// Response interceptor — handle 401 and format errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }

    const apiError: ApiError = error.response?.data ?? {
      detail: error.message || 'Network error',
      status_code: error.response?.status ?? 0,
    };

    return Promise.reject(apiError);
  }
);

export default apiClient;
