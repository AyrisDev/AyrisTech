import { useTranslations, useLocale } from 'next-intl';
import { Link } from '../../i18n/navigation';
import styles from './BlogHero.module.css';
import { Post } from '../../types/database';
import { getI18nEntry } from '../../utils/i18n';

interface BlogHeroProps {
    post?: Post | null;
}

const BlogHero = ({ post }: BlogHeroProps) => {
    const t = useTranslations('Blog.hero');
    const locale = useLocale();

    if (!post) return null;

    const date = new Date(post.published_at || post.created_at || new Date()).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <section className={styles.hero}>
            <div className={styles.bgWrapper}>
                <div
                    className={styles.bgImage}
                    style={post.featured_image ? { backgroundImage: `url(${post.featured_image})` } : undefined}
                ></div>
                <div className={styles.bgOverlay}></div>
            </div>

            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.featuredBadge}>
                        <span className={styles.dot}></span>
                        <span>{t('badge')}</span>
                    </div>

                    <h1 className={styles.title}>
                        {getI18nEntry(post.title, locale)}
                    </h1>

                    <p className={styles.excerpt}>
                        {getI18nEntry(post.excerpt, locale)}
                    </p>

                    <div className={styles.meta}>
                        <Link href={`/blog/${post.slug}`} className={styles.cta}>
                            {t('cta')}
                        </Link>
                        <div className={styles.metaInfo}>
                            <span className={styles.readTime}>⏱️ {post.read_time}</span>
                            <span className={styles.separator}>•</span>
                            <span className={styles.date}>{date}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogHero;
