/** @type {import('next').NextConfig} */
// settings such as picture
const nextConfig = {
    images:{
        domains:["avatars.githubusercontent.com","firebasestorage.googleapis.com","tenor.com"],
        unoptimized: true,
    },
    env: {
        GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
    },
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig