/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    reactStrictMode: false,
    experimental: {
        serverActions: {
            // Allows larger file uploads with server actions
            bodySizeLimit: "8mb",
        },
    },
    
    output: 'standalone',
    webpack: (config, { isServer }) => {
        // Prevent Discord.js from being bundled on server-side to avoid native module conflicts
        if (isServer) {
            if (!config.externals) config.externals = [];

            config.externals.push({
                ["discord.js"]: "commonjs discord.js",
            });
        }
        return config;
    },
};

export default nextConfig;
