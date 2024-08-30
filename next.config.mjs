/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true, // Это добавит слэш в конце URL, что полезно для GitHub Pages
  assetPrefix: process.env.GITHUB_PAGES ? '/your-repo-name/' : '', // Замените 'your-repo-name' на имя вашего репозитория
  // Другие настройки по необходимости
};

export default nextConfig;