// /** @type {import('next').NextConfig} */
// // module.exports = {
// //     reactStrictMode: true,
// // };
// const isProd = process.env.NODE_ENV === 'production'

/**
* @type {import('next').NextConfig}
*/
const nextConfig = {
    reactStrictMode: true,
    images: {
      loader: 'akamai',
      path: '/',
    }
};
  
export default nextConfig;

// module.exports = {
//   basePath: isProd ? '/solana-course' : '',
//   assetPrefix: isProd ? '/solana-course/' : '',
//   images: {
//     unoptimized: true,
//   },
//   publicRuntimeConfig: { basePath: process.env.BASE_PATH || '' }
// }