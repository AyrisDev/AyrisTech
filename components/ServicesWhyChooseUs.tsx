import { useTranslations } from 'next-intl';
import styles from './ServicesWhyChooseUs.module.css';

const featureKeys = [
    { id: 'rapid', icon: '🚀' },
    { id: 'security', icon: '🛡️' },
    { id: 'support', icon: '🎧' }
];

const ServicesWhyChooseUs = () => {
    const t = useTranslations('ServicesPage.WhyChooseUs');

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.visualContainer}>
                    <div className={styles.hudVisual}>
                        <div className={styles.circle}></div>
                        <div className={styles.circleOuter}></div>
                        <div className={styles.statusBadge}>
                            <span className={styles.statusIcon}>🟢</span>
                            <div className={styles.statusText}>
                                <span className={styles.statusLabel}>{t('statusLabel')}</span>
                                <span className={styles.statusValue}>{t('statusValue')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.content}>
                    <h2 className={styles.title}>{t('title')}</h2>

                    <ul className={styles.features}>
                        {featureKeys.map((feature, index) => (
                            <li key={index} className={styles.featureItem}>
                                <div className={styles.featureIcon}>{feature.icon}</div>
                                <div className={styles.featureText}>
                                    <h4 className={styles.featureTitle}>{t(`${feature.id}.title`)}</h4>
                                    <p className={styles.featureDescription}>{t(`${feature.id}.description`)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ServicesWhyChooseUs;
