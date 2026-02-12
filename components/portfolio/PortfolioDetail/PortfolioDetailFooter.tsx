import styles from './PortfolioDetailFooter.module.css';
import { Link } from '../../../i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Project } from '../../../types/database';
import { getI18nEntry } from '../../../utils/i18n';

interface PortfolioDetailFooterProps {
    nextProject?: Project | null;
}

const PortfolioDetailFooter = ({ nextProject }: PortfolioDetailFooterProps) => {
    const t = useTranslations('Portfolio.footer');
    const locale = useLocale();

    if (!nextProject) return null;

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.content}>
                        <span className={styles.label}>{t('nextCase')}</span>
                        <h2 className={styles.title}>{getI18nEntry(nextProject.title, locale)}</h2>
                        <Link href={`/portfolio/${nextProject.slug}`} className={styles.link}>
                            {t('viewCase')} →
                        </Link>
                    </div>

                    <div className={styles.imageWrapper}>
                        <div
                            className={styles.image}
                            style={nextProject.main_image ? { backgroundImage: `url(${nextProject.main_image})` } : undefined}
                        ></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PortfolioDetailFooter;
