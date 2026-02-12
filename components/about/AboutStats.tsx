import { useTranslations } from 'next-intl';
import styles from './AboutStats.module.css';

const AboutStats = () => {
    const t = useTranslations('About.stats');

    const stats = [
        { number: '10+', label: t('years') },
        { number: '200+', label: t('projects') },
        { number: '50+', label: t('clients') },
        { number: '5', label: t('offices') },
    ];

    return (
        <section className={styles.stats}>
            <div className={styles.container}>
                {stats.map((stat, index) => (
                    <div key={index} className={styles.statItem}>
                        <div className={styles.number}>{stat.number}</div>
                        <div className={styles.label}>{stat.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AboutStats;
