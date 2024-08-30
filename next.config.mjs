/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  assetPrefix: process.env.GITHUB_PAGES ? '/buzzenglish' : '', 
};

export default nextConfig;