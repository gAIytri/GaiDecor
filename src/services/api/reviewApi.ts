/**
 * Review API Service
 * POST /reviews, GET /reviews/me
 * (Product reviews are fetched via productApi.fetchProductReviews)
 */

import apiClient from './client';
import { mapApiReview } from './mappers';
import type { Review } from '@/types';
import type { ApiReview, ApiCreateReviewRequest } from '@/types/api';

export async function createReview(request: ApiCreateReviewRequest): Promise<Review> {
  const { data } = await apiClient.post<ApiReview>('/reviews', request);
  return mapApiReview(data);
}

export async function fetchMyReviews(): Promise<Review[]> {
  const { data } = await apiClient.get<ApiReview[]>('/reviews/me');
  return data.map(mapApiReview);
}
