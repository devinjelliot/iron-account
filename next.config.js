/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            dev: true,
            bodySizeLimit: '2mb',
        }
    },
}

module.exports = nextConfig
