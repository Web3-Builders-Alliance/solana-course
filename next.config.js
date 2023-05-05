// /** @type {import('next').NextConfig} */
// // module.exports = {
// //     reactStrictMode: true,
// // };
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  basePath: isProd ? '/solana-course' : '',
  assetPrefix: isProd ? '/solana-course/' : '',
  images: {
    unoptimized: true,
  },
}