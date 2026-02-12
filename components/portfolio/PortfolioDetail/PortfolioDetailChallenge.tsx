import { useTranslations } from 'next-intl';
import styles from './PortfolioDetailChallenge.module.css';

interface PortfolioDetailChallengeProps {
    challenge: any;
    solution: any;
    locale: string;
}

const PortfolioDetailChallenge = ({ challenge, solution, locale }: PortfolioDetailChallengeProps) => {
    // Helper to converting text/jsonb to array of strings
    const parseList = (data: any) => {
        const text = data?.[locale] || data?.en || '';
        if (Array.isArray(text)) return text;
        if (typeof text === 'string') {
            // Split by new lines, remove empty lines
            return text.split('\n').filter(line => line.trim().length > 0);
        }
        return [];
    };

    const challenges = parseList(challenge);
    const solutions = parseList(solution);
    const t = useTranslations('Portfolio');

    if (challenges.length === 0 && solutions.length === 0) return null;

    return (
        <section className={styles.section} id="challenge">
            <div className={styles.container}>

                {/* Challenge Column */}
                <div className={styles.column}>
                    <div className={`${styles.iconWrapper} ${styles.challengeIcon}`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                            <line x1="12" y1="9" x2="12" y2="13"></line>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                    </div>
                    <h3 className={styles.title}>{t('challenge')}</h3>
                    <div className={styles.list}>
                        {challenges.map((item: string, i: number) => (
                            <div key={i} className={styles.item}>
                                <span className={`${styles.bullet} ${styles.bulletChallenge}`}>✕</span>
                                <span className={styles.text}>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Solution Column */}
                <div className={styles.column}>
                    <div className={`${styles.iconWrapper} ${styles.solutionIcon}`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                    </div>
                    <h3 className={styles.title}>{t('solution')}</h3>
                    <div className={styles.list}>
                        {solutions.map((item: string, i: number) => (
                            <div key={i} className={styles.item}>
                                <span className={`${styles.bullet} ${styles.bulletSolution}`}>→</span>
                                <span className={styles.text}>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PortfolioDetailChallenge;
