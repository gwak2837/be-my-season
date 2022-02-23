/** @type {import('next').NextConfig} */
/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  compiler: {
    styledComponents: true,
  },
  i18n: {
    locales: ['ko', 'en'],
    defaultLocale: 'ko',
  },
  images: {
    domains: ['storage.googleapis.com', 'k.kakaocdn.net'],
  },
  poweredByHeader: process.env.NODE_ENV === 'development',
  reactStrictMode: process.env.NODE_ENV === 'development',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}
