/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_FE_URL: process.env.BASE_FE_URL,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
      },
      {
        hostname: 'picsum.photos',
      },
      {
        hostname: 'images.pexels.com',
      },
      {
        hostname: 'propertygurublob.blob.core.windows.net',
      },
      {
        hostname: 'prodpropertygurublob.blob.core.windows.net',
      },
      {
        hostname: 'staging-propertyguru-hjfdd5c4cacke0gs.z03.azurefd.net',
      },
      {
        hostname: 'propertyguru-cdn-g5ekefh3czd8bua3.z03.azurefd.net',
      },
    ],
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.swf$/,
      use: 'file-loader',
      type: 'javascript/auto',
    });

    return config;
  },
};

export default nextConfig;
