import styles from './AdminHeader.module.css';

const AdminHeader = () => {
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <h2 className={styles.title}>Ayris Tech Admin</h2>
                <span className={styles.versionBadge}>v1.0.0</span>
            </div>

            <div className={styles.right}>
                <div className={styles.searchWrapper}>
                    <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input type="text" placeholder="Search..." className={styles.searchInput} />
                    <span className={styles.searchKbd}>⌘K</span>
                </div>

                <button className={styles.notificationBtn}>
                    <span className={styles.dot}></span>
                    🔔
                </button>
            </div>
        </header>
    );
};

export default AdminHeader;
