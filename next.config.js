// /** @type {import('next').NextConfig} */
// // module.exports = {
// //     reactStrictMode: true,
// // };
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  assetPrefix: isProd ? '/solana-course/' : '',
  images: {
    unoptimized: true,
  },
}