/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
  // Pin workspace root so Turbopack doesn't pick up parent lockfiles (D:\...\project\)
  turbopack: {
    root: path.join(__dirname),
  },
  // Enable experimental features
  experimental: {
    optimizePackageImports: [
      '@fortawesome/react-fontawesome',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/free-brands-svg-icons',
      'react-icons',
      'framer-motion',
    ],
  },

  // Allow cross-origin requests in development
  ...(process.env.NODE_ENV === 'development' && {
    allowedDevOrigins: ['127.0.0.1', 'localhost'],
  }),

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api-cdn.figma.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: false, // Enable optimization for better performance
    minimumCacheTTL: 31536000, // Cache images for 1 year
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true,
  },

  // TypeScript optimization
  typescript: {
    ignoreBuildErrors: false,
  },

  // PoweredByHeader for security
  poweredByHeader: false,

  // Compression
  compress: true,

  // Trailing slash handling
  trailingSlash: false,
}

module.exports = nextConfig
