import { useTranslations } from 'next-intl';
import styles from './PortfolioDetailOverview.module.css';

interface PortfolioDetailOverviewProps {
    overview: any;
    image: string;
    locale: string;
}

const PortfolioDetailOverview = ({ overview, image, locale }: PortfolioDetailOverviewProps) => {
    const t = useTranslations('Portfolio');

    return (
        <section className={styles.section} id="overview">
            <h2 className={styles.headline}>{t('overview')}</h2>
            <div className={styles.description}>
                <p>{overview?.[locale] || overview?.en}</p>
            </div>

            <div className={styles.showcaseImage}>
                <div className={styles.imagePlaceholder} style={image ? { backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
                    {!image && <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2940&auto=format&fit=crop" alt="Phone Mockup" />}
                </div>
            </div>
        </section>
    );
};

export default PortfolioDetailOverview;
