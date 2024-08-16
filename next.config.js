/** @type {import('next').NextConfig} */
// settings such as picture
const nextConfig = {
    images:{
        domains:["avatars.githubusercontent.com","firebasestorage.googleapis.com","tenor.com"],
        unoptimized: true,
    },
    env: {
        GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
        NEXT_PUBLIC_WEB_API: process.env.NEXT_PUBLIC_WEB_API
    },
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)