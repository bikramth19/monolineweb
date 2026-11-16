/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['@prisma/client', 'prisma', 'sharp', 'bcryptjs'],
  poweredByHeader: false,
};
export default nextConfig;
