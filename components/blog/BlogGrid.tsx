'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '../../i18n/navigation';
import styles from './BlogGrid.module.css';
import { useState, useEffect } from 'react';
import { blogService } from '../../services/blog/blogService';
import { Post } from '../../types/database';
import { getI18nEntry } from '../../utils/i18n';

const BlogGrid = () => {
    const t = useTranslations('Blog.grid');
    const locale = useLocale();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await blogService.getPublishedPosts();
            setPosts(data);
            setLoading(false);
        };
        fetchPosts();
    }, []);

    if (loading) {
        return (
            <section className={styles.section}>
                <div className={styles.container}>
                    <div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>Loading articles...</div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {posts.map((post) => (
                        <div key={post.id} className={styles.card}>
                            <Link href={`/blog/${post.slug}`} className={styles.cardLink}>
                                <div className={styles.imageWrapper}>
                                    <div
                                        className={styles.image}
                                        style={{ backgroundImage: `url(${post.featured_image})` }}
                                    ></div>
                                    <div className={styles.categoryBadge}>{post.category}</div>
                                </div>
                            </Link>

                            <div className={styles.content}>
                                <div className={styles.meta}>
                                    <span className={styles.author}>{post.author_id || 'Ayris Team'}</span>
                                    <span className={styles.dot}>•</span>
                                    <span className={styles.readTime}>{post.read_time}</span>
                                </div>

                                <Link href={`/blog/${post.slug}`}>
                                    <h3 className={styles.postTitle}>{getI18nEntry(post.title, locale)}</h3>
                                </Link>
                                <p className={styles.postExcerpt}>{getI18nEntry(post.excerpt, locale)}</p>

                                <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                                    {t('readMore')}
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More Button - Logic can be implemented if pagination is added */}
                {/* <div className={styles.loadMoreWrapper}>
                    <button className={styles.loadMoreBtn}>
                        {t('loadMore')}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>
                </div> */}
            </div>
        </section>
    );
};

export default BlogGrid;
