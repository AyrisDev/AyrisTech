import { useTranslations } from 'next-intl';
import styles from './PortfolioHero.module.css';

const PortfolioHero = () => {
    const t = useTranslations('PortfolioHero');

    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.badge}>
                    <span className={styles.dot}></span>
                    <span>{t('badge')}</span>
                </div>

                <h1 className={styles.title}>
                    {t('titleLine1')} <br /> {t('titleLine2')}
                </h1>

                <p className={styles.subtitle}>
                    {t.rich('subtitle', {
                        strong: (chunks) => <strong>{chunks}</strong>
                    })}
                </p>

                <div className={styles.ctaWrapper}>
                    <button className={styles.ctaButton}>
                        {t('cta')}
                        <span className={styles.icon}>+</span>
                    </button>
                </div>

                <div className={styles.sideText}>
                    <span>{t('sideText.line1')}</span>
                    <span>{t('sideText.line2')}</span>
                    <span className={styles.highlight}>{t('sideText.line3')}</span>
                </div>
            </div>
        </section>
    );
};

export default PortfolioHero;
