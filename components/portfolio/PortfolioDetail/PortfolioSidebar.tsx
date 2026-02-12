
import { useTranslations } from 'next-intl';
import styles from './PortfolioSidebar.module.css';

const PortfolioSidebar = () => {
    const t = useTranslations('Portfolio.sidebar');

    return (
        <aside className={styles.sidebar}>
            <nav className={styles.stickyNav}>
                <ul className={styles.navList}>
                    <li><a href="#overview" className={styles.active}>{t('overview')}</a></li>
                    <li><a href="#challenge">{t('challenge')}</a></li>
                    {/* <li><a href="#results">{t('results')}</a></li> Removed as Stats is gone */}
                    <li><a href="#visuals">{t('visuals')}</a></li>
                </ul>

                <div className={styles.ctaBox}>
                    <h4 className={styles.ctaTitle}>{t('ctaTitle')}</h4>
                    <p className={styles.ctaText}>{t('ctaText')}</p>
                    <button className={styles.ctaBtn}>{t('ctaBtn')}</button>
                </div>
            </nav>
        </aside>
    );
};

export default PortfolioSidebar;
