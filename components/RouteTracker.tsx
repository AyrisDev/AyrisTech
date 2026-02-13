'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { init, track } from '@plausible-analytics/tracker';

const RouteTracker = () => {
    const pathname = usePathname();
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            init({
                domain: 'ayris.tech',
                endpoint: '/api/event', // Proxied via next.config.mjs
                outboundLinks: true,
                fileDownloads: true,
                hashBasedRouting: false,
                autoCapturePageviews: false, // Manual tracking
            });
            initialized.current = true;
        }
    }, []);

    useEffect(() => {
        if (initialized.current) {
            track('pageview', {
                url: window.location.href
            });
        }
    }, [pathname]);

    return null;
};

export default RouteTracker;
