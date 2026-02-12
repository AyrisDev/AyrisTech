import styles from './PortfolioDetailStats.module.css';

interface PortfolioDetailStatsProps {
    stats: any[];
    locale: string;
}

const PortfolioDetailStats = ({ stats, locale }: PortfolioDetailStatsProps) => {
    if (!stats || stats.length === 0) return null;

    return (
        <section className={styles.section} id="results">
            <div className={styles.container}>
                <h2 className={styles.title}>The Impact</h2>
                <div className={styles.grid}>
                    {stats.map((stat, i) => (
                        <div key={i} className={styles.statCard}>
                            <div className={styles.number}>{stat.value}</div>
                            <p className={styles.label}>{stat.label?.[locale] || stat.label?.en}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PortfolioDetailStats;
