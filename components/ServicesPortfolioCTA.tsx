import { useTranslations } from 'next-intl';
import styles from './ServicesPortfolioCTA.module.css';
import Link from 'next/link';
const ServicesPortfolioCTA = () => {
    const t = useTranslations('ServicesPage.CTA');
    return (
        <section className={styles.cta}>
            <div className={styles.container}>
                <h3 className={styles.text}>{t('text')}</h3>
                <Link href="/portfolio" className={styles.button}>{t('button')}</Link>
            </div>
        </section>
    );
};

export default ServicesPortfolioCTA;
