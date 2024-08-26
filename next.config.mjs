/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'catmocha.jp',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
