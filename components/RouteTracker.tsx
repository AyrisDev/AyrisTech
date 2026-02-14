'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const RouteTracker = () => {
    const pathname = usePathname();
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            (window as any).plausible = (window as any).plausible || function() {
                ((window as any).plausible.q = (window as any).plausible.q || []).push(arguments);
            };
            initialized.current = true;
        }
    }, []);

    useEffect(() => {
        if (initialized.current && (window as any).plausible) {
            (window as any).plausible('pageview', {
                url: window.location.href
            });
        }
    }, [pathname]);

    return null;
};

export default RouteTracker;
