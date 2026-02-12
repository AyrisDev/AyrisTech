import { useTranslations } from 'next-intl';
import styles from './PortfolioCTA.module.css';

const PortfolioCTA = () => {
    const t = useTranslations('PortfolioCTA');

    return (
        <section className={styles.cta}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <span className={styles.badge}>{t('badge')}</span>
                    <h2 className={styles.title}>
                        {t('title')} <br /> <span>{t('titleHighlight')}</span>
                    </h2>
                    <p className={styles.subtitle}>
                        {t('subtitle')}
                    </p>
                    <button className={styles.button}>
                        {t('button')}
                        <span className={styles.icon}>✨</span>
                    </button>
                </div>

                {/* Abstract Sphere Visual */}
                <div className={styles.sphereWrapper}>
                    <div className={styles.sphere}></div>
                    <div className={styles.sphereGlow}></div>
                </div>
            </div>
        </section>
    );
};

export default PortfolioCTA;
