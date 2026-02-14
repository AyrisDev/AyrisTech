import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/event",
                destination: "https://analytics.ayris.tech/api/event",
            },
        ];
    },
};

export default withNextIntl(nextConfig);
