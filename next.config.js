/** @type {import('next').NextConfig} */
// settings such as picture
const nextConfig = {
    images:{
        timeout: 3000, // 默认是1000，这里设置为3000毫秒
        domains:["avatars.githubusercontent.com","firebasestorage.googleapis.com","tenor.com"],
        unoptimized: true,
    },
    reactStrictMode: false
}

module.exports = nextConfig