import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/js/script.js",
                destination: "https://insight.ayris.tech/js/script.file-downloads.hash.outbound-links.pageview-props.revenue.tagged-events.js",
            },
            {
                source: "/api/event",
                destination: "https://insight.ayris.tech/api/event",
            },
        ];
    },
};

export default withNextIntl(nextConfig);
