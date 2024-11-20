/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (isServer) {
            const externals = ["discord.js"];

            if (!config.externals) {
                config.externals = [];
            }

            config.externals.push(
                ...externals.map((mod) => ({
                    [mod]: `commonjs ${mod}`,
                }))
            );
        }

        return config;
    },
};

export default nextConfig;
