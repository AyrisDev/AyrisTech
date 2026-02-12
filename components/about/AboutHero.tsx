import { useTranslations } from 'next-intl';
import styles from './AboutHero.module.css';

const AboutHero = () => {
    const t = useTranslations('About.hero');

    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.badge}>
                        <span className={styles.dot}></span>
                        <span>{t('who')}</span>
                    </div>
                    <h1 className={styles.title}>
                        {t('titlePrefix')} <br /> the <span className={styles.highlight}>{t('titleHighlight')}</span>
                    </h1>
                    <p className={styles.description}>
                        {t('desc')}
                    </p>
                    <div className={styles.ctaGroup}>
                        <button className={styles.primaryBtn}>{t('ctaWork')}</button>
                        <button className={styles.secondaryBtn}>{t('ctaCareers')}</button>
                    </div>
                </div>
                <div className={styles.imageWrapper}>
                    <div className={styles.experienceImage}>
                        {/* Visual element representing high-end server room / infrastructure */}
                        <div className={styles.imageOverlay}></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutHero;
