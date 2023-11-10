/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  i18n:{
    locales: ['pt', 'en', 'es'],
    defaultLocale: 'pt',
  }
}

module.exports = nextConfig
