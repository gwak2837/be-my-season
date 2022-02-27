/** @type {import('next').NextConfig} */
/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path')

module.exports = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    outputStandalone: true,
  },
  images: {
    domains: ['storage.googleapis.com', 'k.kakaocdn.net'],
  },
  poweredByHeader: process.env.NODE_ENV === 'development',
  reactStrictMode: process.env.NODE_ENV === 'development',
  webpack: (config) => {
    const rules = config.module.rules
    rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    rules.push({
      include: resolve(__dirname, 'src'),
      test: /\.(graphql|sql)$/,
      type: 'asset/source',
    })
    return config
  },
}
