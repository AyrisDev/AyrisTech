import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/event",
                destination: "http://plausible-vcwggswcogs8c04kwsocs84k.65.109.236.58.sslip.io/api/event",
            },
        ];
    },
};

export default withNextIntl(nextConfig);
