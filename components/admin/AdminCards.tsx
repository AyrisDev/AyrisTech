import styles from './AdminCards.module.css';

interface StatCardProps {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
    status?: string;
}

export const StatCard = ({ title, value, change, isPositive, status }: StatCardProps) => (
    <div className={styles.statCard}>
        <div className={styles.statHeader}>
            <span className={styles.statTitle}>{title}</span>
            {status && <span className={styles.statusBadge}>{status}</span>}
        </div>
        <div className={styles.statBody}>
            <h3 className={styles.statValue}>{value}</h3>
            <div className={`${styles.statChange} ${isPositive ? styles.positive : styles.negative}`}>
                {isPositive ? '↗' : '↘'} {change}
            </div>
        </div>
        <div className={styles.statChart}>
            {/* Mock mini chart - in reality we could use a simple SVG path */}
            <div className={styles.sparkline}></div>
        </div>
    </div>
);

export const TerminalBox = () => (
    <div className={styles.terminal}>
        <div className={styles.terminalHeader}>
            <div className={styles.terminalDots}>
                <span></span><span></span><span></span>
            </div>
            <div className={styles.terminalTitle}>ayris-cli — v2.4</div>
        </div>
        <div className={styles.terminalBody}>
            <div className={styles.line}><span className={styles.prompt}>root@ayris:~$</span> connect --secure neural_net_v4</div>
            <div className={styles.line}><span className={styles.dim}>&gt; connecting to neural_net_v4...</span></div>
            <div className={styles.line}><span className={styles.success}>Connection established (23ms) ✓</span></div>
            <div className={styles.line}><span className={styles.prompt}>root@ayris:~$</span> load_weights --latest --optimize</div>
            <div className={styles.line}><span className={styles.dim}>Loading weights from /models/prod/bert-large...</span></div>
            <div className={styles.progressWrapper}>
                <div className={styles.progressBar} style={{ width: '85%' }}></div>
            </div>
            <div className={styles.line}>Optimization complete. Memory saved: 12%</div>
            <div className={styles.line}><span className={styles.prompt}>root@ayris:~$</span> run diagnostics --gpu</div>
            <div className={styles.blinkLine}><span className={styles.success}>Checking GPU clusters...</span><span className={styles.cursor}></span></div>
        </div>
    </div>
);
