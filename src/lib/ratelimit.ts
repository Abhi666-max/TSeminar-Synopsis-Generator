import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// Use dummy values if env vars are missing so build doesn't fail, 
// but we will bypass rate limiting in the API if invalid.
const redisUrl = process.env.UPSTASH_REDIS_REST_URL || "";
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || "";

const isRedisConfigured = redisUrl.startsWith("http") && redisToken.length > 0;

export const redis = isRedisConfigured ? new Redis({
  url: redisUrl,
  token: redisToken,
}) : null;

// Create a new ratelimiter, that allows 2 requests per 1 minute
export const ratelimit = isRedisConfigured ? new Ratelimit({
  redis: redis!,
  limiter: Ratelimit.slidingWindow(2, "1 m"),
  analytics: true,
}) : null;
