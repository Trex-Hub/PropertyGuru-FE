/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    ...(process.env.NEXT_PUBLIC_MODE === 'production' ? { cssnano: {} } : {}),
  },
};

export default config;
