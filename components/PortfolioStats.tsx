import styles from './PortfolioStats.module.css';

const PortfolioStats = () => {
    return (
        <section className={styles.stats}>
            <div className={styles.container}>
                <div className={styles.statItem}>
                    <div className={styles.number}>1M+</div>
                    <div className={styles.label}>ACTIVE <br /> USERS</div>
                </div>

                <div className={styles.statItem}>
                    <div className={styles.number}>$500M</div>
                    <div className={styles.label}>ASSETS <br /> MANAGED</div>
                </div>

                <div className={styles.statItem}>
                    <div className={styles.number}>45+</div>
                    <div className={styles.label}>PRODUCTS <br /> SHIPPED</div>
                </div>

                <div className={styles.progressContainer}>
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill}></div>
                    </div>
                    <span className={styles.progressLabel}>ONGOING PROJECTS</span>
                </div>
            </div>
        </section>
    );
};

export default PortfolioStats;
