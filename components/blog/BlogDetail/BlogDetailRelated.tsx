'use client';

import styles from './BlogDetailRelated.module.css';
import { useState, useEffect } from 'react';
import { blogService } from '../../../services/blog/blogService';
import { Post } from '../../../types/database';
import { getI18nEntry } from '../../../utils/i18n';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '../../../i18n/navigation';

interface BlogDetailRelatedProps {
    currentId?: string;
}

const BlogDetailRelated = ({ currentId }: BlogDetailRelatedProps) => {
    const locale = useLocale();
    const t = useTranslations('Blog.related');
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchRelated = async () => {
            if (!currentId) return;
            const data = await blogService.getRandomPosts(2, currentId);
            setPosts(data);
        };
        fetchRelated();
    }, [currentId]);

    if (posts.length === 0) return null;

    return (
        <section className={styles.related}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h3 className={styles.title}>{t('title')}</h3>
                    <Link href="/blog" className={styles.viewAll}>{t('viewAll')}</Link>
                </div>

                <div className={styles.grid}>
                    {posts.map((post) => (
                        <div key={post.id} className={styles.card}>
                            <Link href={`/blog/${post.slug}`}>
                                <div className={styles.imageWrapper}>
                                    <div className={styles.image} style={{ backgroundImage: `url(${post.featured_image})` }}></div>
                                </div>
                            </Link>
                            <div className={styles.content}>
                                <span className={styles.category}>{post.category}</span>
                                <Link href={`/blog/${post.slug}`} className={styles.titleLink}>
                                    <h4 className={styles.postTitle}>{getI18nEntry(post.title, locale)}</h4>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogDetailRelated;
