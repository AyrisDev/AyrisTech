import { useTranslations } from 'next-intl';
import styles from './Services.module.css';

const serviceKeys = [
    { id: 'ai', icon: '🤖' },
    { id: 'blockchain', icon: '⛓️' },
    { id: 'mobile', icon: '📱' },
    { id: 'web', icon: '🌐' }
];

const Services = () => {
    const t = useTranslations('HomePage.Services');

    return (
        <section className={styles.services}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.textGroup}>
                        <span className={styles.sectionBadge}>{t('badge')}</span>
                        <h2 className={styles.title}>{t('titleLine1')}<br />{t('titleLine2')}</h2>
                    </div>
                    <p className={styles.headerDescription}>
                        {t('desc')}
                    </p>
                </div>

                <div className={styles.grid}>
                    {serviceKeys.map((service, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.cardImagePlaceholder}>
                                <div className={styles.innerPattern}></div>
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.icon}>{service.icon}</div>
                                <h3 className={styles.cardTitle}>{t(`items.${service.id}.title`)}</h3>
                                <p className={styles.cardDescription}>{t(`items.${service.id}.desc`)}</p>
                                <a href="/services" className={styles.learnMore}>{t('learnMore')}</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
