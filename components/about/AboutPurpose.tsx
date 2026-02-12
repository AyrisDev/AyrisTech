import { useTranslations } from 'next-intl';
import styles from './AboutPurpose.module.css';

const AboutPurpose = () => {
    const t = useTranslations('About.purpose');

    return (
        <section className={styles.purpose}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{t('title')}</h2>
                    <p className={styles.description}>{t('desc')}</p>
                </div>

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <div className={styles.iconWrapper}>🚀</div>
                        <h3 className={styles.cardTitle}>{t('mission.title')}</h3>
                        <p className={styles.cardText}>{t('mission.text')}</p>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.iconWrapper}>👁️</div>
                        <h3 className={styles.cardTitle}>{t('vision.title')}</h3>
                        <p className={styles.cardText}>{t('vision.text')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutPurpose;
