import { useTranslations } from 'next-intl';
import styles from './AboutValues.module.css';

const AboutValues = () => {
    const t = useTranslations('About.values');

    const values = [
        {
            title: t('innovation.title'),
            text: t('innovation.text'),
            icon: '📍'
        },
        {
            title: t('transparency.title'),
            text: t('transparency.text'),
            icon: '✅'
        },
        {
            title: t('precision.title'),
            text: t('precision.text'),
            icon: '🏆'
        },
        {
            title: t('userCentricity.title'),
            text: t('userCentricity.text'),
            icon: '👥'
        }
    ];

    return (
        <section className={styles.values}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2 className={styles.title}>{t('title')}</h2>
                    <p className={styles.description}>{t('desc')}</p>
                    <a href="#" className={styles.joinMenu}>{t('join')} →</a>
                </div>

                <div className={styles.grid}>
                    {values.map((val, index) => (
                        <div key={index} className={styles.valueCard}>
                            <div className={styles.icon}>{val.icon}</div>
                            <h4 className={styles.valTitle}>{val.title}</h4>
                            <p className={styles.valText}>{val.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutValues;
