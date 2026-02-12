import styles from './BlogDetailHeader.module.css';
import { Link } from '../../../i18n/navigation';

interface BlogDetailHeaderProps {
    title: string;
    category: string;
    date: string;
    readTime: string;
    commentsCount: number;
    featuredImage?: string;
}

const BlogDetailHeader = ({ title, category, date, readTime, commentsCount, featuredImage }: BlogDetailHeaderProps) => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <nav className={styles.breadcrumbs}>
                    <Link href="/">Home</Link>
                    <span className={styles.sep}>/</span>
                    <Link href="/blog">Blog</Link>
                    <span className={styles.sep}>/</span>
                    <span className={styles.current}>{category}</span>
                </nav>

                <h1 className={styles.title}>{title}</h1>

                <div className={styles.meta}>
                    <span className={styles.metaItem}>📅 {date}</span>
                    <span className={styles.metaItem}>⏱️ {readTime}</span>
                    <span className={styles.metaItem}>💬 {commentsCount} comments</span>
                </div>

                <div className={styles.imageContainer}>
                    <div
                        className={styles.mainImage}
                        style={featuredImage ? { backgroundImage: `url(${featuredImage})` } : undefined}
                    ></div>
                    <div className={styles.imageOverlay}></div>
                </div>
            </div>
        </header>
    );
};

export default BlogDetailHeader;
