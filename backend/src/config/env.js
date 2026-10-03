import 'dotenv/config';

const isProd = process.env.NODE_ENV === 'production';

function fail(message) {
  console.error(`\n❌  Configuration problem: ${message}`);
  console.error('    Copy ".env.example" to ".env" and fill it in (see README).\n');
  process.exit(1);
}

if (!process.env.MONGODB_URI) fail('MONGODB_URI is missing.');
if (!process.env.JWT_SECRET) fail('JWT_SECRET is missing.');
if (process.env.JWT_SECRET.length < 32) fail('JWT_SECRET is too short (use at least 32 characters).');

const list = (v, fallback) =>
  (v || fallback)
    .split(',')
    .map((s) => s.trim().replace(/\/+$/, ''))
    .filter(Boolean);

export const env = {
  isProd,
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  clientUrls: list(process.env.CLIENT_URL, 'http://localhost:5173'),
  publicUrl: (process.env.PUBLIC_URL || `http://localhost:${process.env.PORT || 5000}`).replace(/\/+$/, ''),
  cookieSameSite: ['lax', 'strict', 'none'].includes(process.env.COOKIE_SAMESITE) ? process.env.COOKIE_SAMESITE : 'lax',
  reviewModeration: process.env.REVIEW_MODERATION === 'true',
};
