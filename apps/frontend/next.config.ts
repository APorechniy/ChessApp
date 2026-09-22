import type { NextConfig } from 'next'
import path from 'path';

const BACKEND_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://backend:8080'
    : 'http://127.0.0.1:3000';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname, '../../'),

  outputFileTracingIncludes: {
    '/**': [
      '../../node_modules/async-function/**/*',
      './node_modules/async-function/**/*',
    ],
  },

  eslint: {
    dirs: ['pages', 'utils', 'components', 'store', 'hooks'],
  },
  async rewrites() {
    return [
      {
        // Когда приходит запрос на /api/что-угодно
        source: '/api/:path*',
        // Перенаправляем его на контейнер бэкенда БЕЗ префикса /api
        destination: `${BACKEND_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
