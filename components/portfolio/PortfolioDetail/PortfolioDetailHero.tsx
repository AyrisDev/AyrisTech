import { useTranslations } from 'next-intl';
import styles from './PortfolioDetailHero.module.css';

interface PortfolioDetailHeroProps {
    title: string;
    category: string;
    client: string;
    role: string;
    sector: string;
    year: string;
    coverImage: string;
    websiteUrl?: string; // Optional
}

const PortfolioDetailHero = ({ title, category, client, role, sector, year, coverImage, websiteUrl }: PortfolioDetailHeroProps) => {
    const t = useTranslations('Portfolio');

    return (
        <section className={styles.hero}>
            <div className={styles.bgWrapper}>
                <div className={styles.bgImage} style={coverImage ? { backgroundImage: `url(${coverImage})` } : {}}></div>
                <div className={styles.overlay}></div>
            </div>

            <div className={styles.container}>
                <div className={styles.content}>
                    <span className={styles.categoryBadge}>{category}</span>
                    <h1 className={styles.title}>{title}</h1>
                </div>

                <div className={styles.metaGrid}>
                    <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>{t('client')}</span>
                        <span className={styles.metaValue}>{client}</span>
                    </div>
                    <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>{t('role')}</span>
                        <span className={styles.metaValue}>{role}</span>
                    </div>
                    <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>{t('sector')}</span>
                        <span className={styles.metaValue}>{sector}</span>
                    </div>
                    <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>{t('year')}</span>
                        <span className={styles.metaValue}>{year}</span>
                    </div>
                    {websiteUrl && (
                        <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>{t('website')}</span>
                            <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className={styles.metaLink}>
                                {t('visitLive')}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PortfolioDetailHero;
