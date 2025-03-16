/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Конфигурация за изображения
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.countryflags.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.countryflags.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**',
      },
    ],
  },
  // Други конфигурации...
}

export default nextConfig 