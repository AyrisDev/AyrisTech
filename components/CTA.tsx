import { useTranslations } from 'next-intl';
import styles from './CTA.module.css';

const CTA = () => {
    const t = useTranslations('HomePage.CTA');
    return (
        <section className={styles.ctaSection}>
            <div className={styles.container}>
                <div className={styles.box}>
                    <h2 className={styles.title}>{t('title')}</h2>
                    <p className={styles.subtitle}>
                        {t('subtitle')}
                    </p>
                    <button className={styles.button}>{t('button')}</button>
                </div>
            </div>
        </section>
    );
};

export default CTA;
