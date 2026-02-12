'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './BlogFilters.module.css';

const BlogFilters = () => {
    const t = useTranslations('Blog.filters');
    const [activeTab, setActiveTab] = useState(t('all'));

    const categories = [
        { key: 'all', label: t('all') },
        { key: 'engineering', label: t('engineering') },
        { key: 'design', label: t('design') },
        { key: 'strategy', label: t('strategy') },
        { key: 'cases', label: t('cases') },
        { key: 'ai', label: t('ai') }
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.tabs}>
                    {categories.map((cat) => (
                        <button
                            key={cat.key}
                            className={`${styles.tab} ${activeTab === cat.label ? styles.active : ''}`}
                            onClick={() => setActiveTab(cat.label)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <div className={styles.actions}>
                    <button className={styles.filterBtn}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogFilters;
