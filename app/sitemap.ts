import { MetadataRoute } from 'next';
import { locales } from '../i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://ayris.tech';
    
    // Core routes
    const routes = [
        '',
        '/about',
        '/services',
        '/portfolio',
        '/blog',
        '/contact',
    ];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    // Add localized versions for each route
    routes.forEach((route) => {
        locales.forEach((locale) => {
            const url = `${baseUrl}/${locale}${route}`;
            sitemapEntries.push({
                url,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: route === '' ? 1 : 0.8,
            });
        });
    });

    return sitemapEntries;
}
