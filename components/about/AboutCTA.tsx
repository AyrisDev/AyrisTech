import { useTranslations } from 'next-intl';
import styles from './AboutCTA.module.css';

const AboutCTA = () => {
    const t = useTranslations('About.cta');

    return (
        <section className={styles.cta}>
            <div className={styles.container}>
                <div className={styles.box}>
                    <h2 className={styles.title}>{t('title')}</h2>
                    <p className={styles.description}>{t('desc')}</p>
                    <button className={styles.button}>{t('btn')}</button>
                </div>
            </div>
        </section>
    );
};

export default AboutCTA;
