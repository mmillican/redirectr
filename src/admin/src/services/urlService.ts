import type { CreateShortUrlRequest, ShortUrl } from '@/models';
import Api from './baseService';

export async function createUrl(request: CreateShortUrlRequest): Promise<ShortUrl> {
  const response = await Api.post('urls', request);
  return response.data as ShortUrl;
}
