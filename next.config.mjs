/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Workaround para ambientes Windows com lock intermitente em ".next/trace"
  distDir: "build"
};

export default nextConfig;
