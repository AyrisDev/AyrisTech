import { useTranslations } from 'next-intl';
import styles from './Testimonial.module.css';

const Testimonial = () => {
    const t = useTranslations('HomePage.Testimonial');
    return (
        <section className={styles.testimonial}>
            <div className={styles.container}>
                <div className={styles.quoteIcon}>"</div>
                <blockquote className={styles.quote}>
                    {t('text')}
                </blockquote>
                <div className={styles.author}>
                    <div className={styles.avatar}>MC</div>
                    <div className={styles.info}>
                        <span className={styles.name}>{t('author')}</span>
                        <span className={styles.role}>{t('role')}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
