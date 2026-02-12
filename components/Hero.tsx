import styles from './Hero.module.css';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '../i18n/navigation';


const Hero = () => {
    const t = useTranslations('Hero');
    const locale = useLocale();

    return (
        <section className={styles.hero}>
            <div className={styles.bgElements}>
                <div className={styles.bgImage}></div>
                <div className={styles.bgGradient}></div>
                <div className={styles.blobPrimary}></div>
                <div className={styles.blobBlue}></div>
            </div>

            <div className={styles.container}>
                <div className={styles.badge}>
                    <span>{t('badge')}</span>
                </div>

                <h1 className={styles.title}>
                    {t('titlePrefix')} <span className={styles.highlight}>{t('titleHighlight')}</span>
                    {locale === 'tr' && <><br />{t('titleSuffix')}</>}
                </h1>

                <p className={styles.subtitle}>
                    {t('subtitle')}
                </p>

                <div className={styles.ctaGroup}>
                    <Link href="/contact" className={styles.primaryCta}>{t('ctaStart')}</Link>
                    <Link href="/portfolio" className={styles.secondaryCta}>{t('ctaCase')}</Link>
                </div>
            </div>
        </section>
    );
};


export default Hero;
