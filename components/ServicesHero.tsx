import { useTranslations } from 'next-intl';
import styles from './ServicesHero.module.css';

const ServicesHero = () => {
    const t = useTranslations('ServicesPage.Hero');
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.badge}>
                    <span className={styles.badgeIcon}>✨</span>
                    <span>{t('badge')}</span>
                </div>

                <h1 className={styles.title}>
                    {t('titleLine1')} <br />{t('titleLine2')}
                </h1>

                <p className={styles.subtitle}>
                    {t('subtitle')}
                </p>
            </div>
        </section>
    );
};

export default ServicesHero;
