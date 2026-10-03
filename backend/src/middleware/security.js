import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';

const tooMany = (message) => (_req, _res, next) => next(new AppError(429, message));

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  handler: tooMany('Too many attempts. Please wait a few minutes and try again.'),
});

export const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 12,
  standardHeaders: true,
  legacyHeaders: false,
  handler: tooMany('Too many attempts. Please wait a few minutes and try again.'),
});

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 600,
  standardHeaders: true,
  legacyHeaders: false,
  handler: tooMany('Too many requests. Please slow down.'),
});

/**
 * Extra CSRF protection: browsers always send an Origin header on cross-site
 * POST/PUT/DELETE requests. If it is present it must be one of our own sites.
 */
export function originCheck(req, _res, next) {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
  const origin = req.get('origin');
  if (!origin) return next();
  const allowed = [...env.clientUrls, env.publicUrl];
  if (allowed.includes(origin.replace(/\/+$/, ''))) return next();
  next(new AppError(403, 'Request blocked.'));
}
