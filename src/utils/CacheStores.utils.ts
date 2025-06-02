import type { Cache } from 'cache-manager';

export async function remember<T>(
  cache: Cache,
  key: string,
  ttl: number,
  callback: () => Promise<T>
): Promise<T> {
  const cached = await cache.get<T>(key);
  if (cached) return cached;

  const result = await callback();
  await cache.set(key, result, ttl);
  return result;
}
