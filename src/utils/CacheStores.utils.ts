import type { Cache } from 'cache-manager';
import Redis from 'ioredis';

export const redisClient = new Redis(process.env.REDIS_URL!);
export async function remember<T>(
  cache: Cache,
  key: string,
  ttl: number,
  callback: () => Promise<T>
): Promise<T> {
  const cached = await cache.get<T>(key);
  if (cached !== undefined && cached !== null) return cached;

  const result = await callback();
  await cache.set(key, result, ttl);
  return result;
}
export async function clearCacheByPrefix(prefix: string): Promise<void> {
  const keys = await redisClient.keys(`${prefix}*`);
  if (keys.length === 0) return;
  await redisClient.del(...keys);
}