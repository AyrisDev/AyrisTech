import { useTranslations } from 'next-intl';
import styles from './BlogNewsletter.module.css';

const BlogNewsletter = () => {
    const t = useTranslations('Blog.newsletter');

    return (
        <section className={styles.newsletter}>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.content}>
                        <h2 className={styles.title}>{t('title')}</h2>
                        <p className={styles.description}>
                            {t('desc')}
                        </p>
                    </div>

                    <div className={styles.formWrapper}>
                        <form className={styles.form}>
                            <input
                                type="email"
                                placeholder={t('input')}
                                className={styles.input}
                            />
                            <button type="submit" className={styles.button}>{t('button')}</button>
                        </form>
                        <p className={styles.consent}>
                            {t('consent')} <a href="#">Privacy Policy</a>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogNewsletter;
