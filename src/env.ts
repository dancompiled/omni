import 'dotenv/config';

export const ENV = {
  PORT: process.env['PORT'] || 4000,
  NODE_ENV: process.env['NODE_ENV'] || 'development',
  PG_URL: process.env['PG_URL'] as string,
  SENTRY_DSN: process.env['SENTRY_DSN'] as string,
};
