import styles from './BlogDetailContent.module.css';
import { I18nText } from '../../../types/database';
import { getI18nEntry } from '../../../utils/i18n';
import { useLocale } from 'next-intl';
import ReactMarkdown from 'react-markdown';

interface BlogDetailContentProps {
    content: I18nText | string;
    tags?: I18nText | string; // Tags coming from DB
}

const BlogDetailContent = ({ content, tags }: BlogDetailContentProps) => {
    const locale = useLocale();
    const contentText = getI18nEntry(content, locale);

    // Parse tags
    // Parse tags
    const tagsData = tags ? getI18nEntry(tags, locale) : '';
    let tagsList: string[] = [];

    if (Array.isArray(tagsData)) {
        tagsList = tagsData;
    } else if (typeof tagsData === 'string') {
        tagsList = tagsData.split(',').map(t => t.trim()).filter(Boolean);
    }

    return (
        <div className={styles.section}>
            <div className={styles.container}>
                {/* ... existing sidebar ... */}
                {/* Left Sidebar: Author & Share */}
                <aside className={styles.leftSidebar}>
                    <div className={styles.authorCard}>
                        <div className={styles.authorAvatar}></div>
                        <div className={styles.authorInfo}>
                            <h4 className={styles.authorName}>Sarah Jenkins</h4>
                            <p className={styles.authorRole}>CEO @ Ayris Tech</p>
                        </div>
                        <p className={styles.authorBio}>
                            Exploring the intersection of deep tech and scalable software architecture since 2014.
                        </p>
                        <button className={styles.followBtn}>Follow Sarah</button>
                    </div>

                    <div className={styles.shareActions}>
                        <p className={styles.shareLabel}>SHARE THIS ARTICLE</p>
                        <div className={styles.shareIcons}>
                            <button className={styles.shareBtn}>🔗</button>
                            <button className={styles.shareBtn}>𝕏</button>
                            <button className={styles.shareBtn}>in</button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <article className={styles.mainContent}>
                    <div className={styles.articleBody}>
                        <div className="prose lg:prose-xl">
                            <ReactMarkdown>{contentText}</ReactMarkdown>
                        </div>

                        {tagsList.length > 0 && (
                            <div className={styles.tags}>
                                {tagsList.map((tag, i) => (
                                    <span key={i} className={styles.tag}>
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </article>


            </div>
        </div>
    );
};

export default BlogDetailContent;
