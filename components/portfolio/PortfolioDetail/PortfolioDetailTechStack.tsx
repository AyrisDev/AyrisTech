import { useTranslations } from 'next-intl';
import styles from './PortfolioDetailTechStack.module.css';
import { Technology } from '../../../types/database';

interface PortfolioDetailTechStackProps {
    technologies?: string[];
    technologies_data?: Technology[];
}

const getIcon = (techName: string) => {
    const t = techName.toLowerCase().replace('.', '').replace(/\s/g, '');
    // Simple fallback mapping if no icon_url is present
    if (t.includes('react')) return (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fillOpacity="0.3" />
            <ellipse cx="12" cy="12" rx="2" ry="2" />
            <ellipse cx="12" cy="12" rx="7" ry="2" transform="rotate(27 12 12)" stroke="currentColor" strokeWidth="1" fill="none" />
            <ellipse cx="12" cy="12" rx="7" ry="2" transform="rotate(90 12 12)" stroke="currentColor" strokeWidth="1" fill="none" />
            <ellipse cx="12" cy="12" rx="7" ry="2" transform="rotate(153 12 12)" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
    );
    // ... keep existing fallbacks if desired, or simplified generic:
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
    );
};

const PortfolioDetailTechStack = ({ technologies, technologies_data }: PortfolioDetailTechStackProps) => {
    const t = useTranslations('Portfolio');

    // Prefer rich data, fallback to strings
    const hasRichData = technologies_data && technologies_data.length > 0;
    const hasLegacyData = technologies && technologies.length > 0;

    if (!hasRichData && !hasLegacyData) return null;
    console.log(technologies);
    return (
        <section className={styles.section}>
            <div className={styles.headerLine}></div>
            <h4 className={styles.title}>{t('technologies')}</h4>
            <div className={styles.grid}>
                {hasRichData ? (
                    technologies_data!.map((tech) => (
                        <div key={tech.id} className={styles.card}>
                            <div className={styles.iconWrapper}>
                                {tech.icon_url ? (
                                    <img src={tech.icon_url} alt="" className={styles.techIcon} loading="lazy" />
                                ) : (
                                    getIcon(tech.name)
                                )}
                            </div>
                            <span className={styles.name}>{tech.name}</span>
                        </div>
                    ))
                ) : (
                    technologies!.map((tech, i) => (
                        <div key={i} className={styles.card}>
                            <div className={styles.iconWrapper}>
                                {getIcon(tech)}
                            </div>
                            <span className={styles.name}>{tech}</span>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default PortfolioDetailTechStack;
