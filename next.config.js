/** @type {import('next').NextConfig} */
const nextConfig = {
    // staticPageGenerationTimeout: 200000,
    reactStrictMode: false,
    compiler: {
        styledComponents: true,
    },
    images: {
        domains: ['images.ctfassets.net', 'downloads.ctfassets.net'],
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    experimental: {
        esmExternals: false,
        largePageDataBytes: 2 * 1024 * 1024 * 1024,
    },

    // Add redirects here
    async redirects() {
        return [
            {
                source: '/drift-away', // The path you want to redirect from
                destination: '/', // The path you want to redirect to
                permanent: true, // Set to true for permanent redirect (301)
            },
        ]
    }
}

module.exports = nextConfig
