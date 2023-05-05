// /** @type {import('next').NextConfig} */
// // module.exports = {
// //     reactStrictMode: true,
// // };
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  assetPrefix: isProd ? '/Web3-Builders-Alliance/enrollment-check/' : '',
  images: {
    unoptimized: true,
  },
}