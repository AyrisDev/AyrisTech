import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { StatCard, TerminalBox } from '../../components/admin/AdminCards';
import styles from './AdminPage.module.css';
import { dashboardService } from '../../services/dashboard/dashboardService';

export default async function AdminPage() {
    const stats = await dashboardService.getStats();

    return (
        <div className={styles.adminWrapper}>
            <AdminSidebar />

            <main className={styles.mainContent}>
                <AdminHeader />

                <div className={styles.container}>
                    {/* Welcome Header */}
                    <div className={styles.pageHeader}>
                        <div>
                            <h1 className={styles.pageTitle}>Dashboard Overview</h1>
                            <p className={styles.pageSub}>Welcome back, Administrator. Here's what's happening today.</p>
                        </div>
                        <div className={styles.pageActions}>
                            <button className={styles.secondaryBtn}>📦 View Reports</button>
                            <button className={styles.primaryBtn}>+ Add New Project</button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className={styles.statsGrid}>
                        <StatCard title="Total Projects" value={stats.totalProjects.toString()} change="Active" isPositive={true} />
                        <StatCard title="Unread Messages" value="0" change="Soon" isPositive={true} status="Pending" />
                        <StatCard title="Blog Posts" value={stats.totalPosts.toString()} change="Published" isPositive={true} />
                        <StatCard title="Services Active" value="6" change="Stable" isPositive={true} status="Stable" />
                    </div>

                    {/* Chart & Terminal Section */}
                    <div className={styles.dataSection}>
                        <div className={styles.chartWrapper}>
                            <div className={styles.chartHeader}>
                                <h4 className={styles.chartTitle}>Traffic Overview <span className={styles.liveDot}></span></h4>
                                <div className={styles.chartControls}>
                                    <span className={styles.activeLabel}>Live</span>
                                    <span>24H</span>
                                    <span>7D</span>
                                </div>
                            </div>

                            <div className={styles.chartArea}>
                                {/* Mock Waveform SVG */}
                                <svg className={styles.waveform} viewBox="0 0 800 240">
                                    <path
                                        d="M0 120 Q 50 200, 100 120 T 200 120 T 300 120 T 400 60 T 500 150 T 600 120 T 700 80 T 800 120"
                                        fill="none"
                                        stroke="var(--primary)"
                                        strokeWidth="3"
                                    />
                                    <path
                                        d="M0 150 Q 50 120, 100 150 T 200 150 T 300 150 T 400 180 T 500 130 T 600 150 T 700 160 T 800 150"
                                        fill="none"
                                        stroke="#333"
                                        strokeWidth="2"
                                        strokeDasharray="5,5"
                                    />
                                </svg>
                            </div>
                        </div>

                        <TerminalBox />
                    </div>

                    {/* Recent Inquiries Table */}
                    <div className={styles.tableSection}>
                        <div className={styles.tableHeader}>
                            <h4 className={styles.tableTitle}>Recent Inquiries</h4>
                            <button className={styles.viewAll}>View All Messages</button>
                        </div>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>NAME</th>
                                    <th>SUBJECT</th>
                                    <th>STATUS</th>
                                    <th>DATE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>John Doe</td>
                                    <td>Project Inquiry: E-commerce</td>
                                    <td><span className={styles.badgeWarning}>Unread</span></td>
                                    <td>2h ago</td>
                                </tr>
                                <tr>
                                    <td>Tech Corp</td>
                                    <td>Partnership Proposal</td>
                                    <td><span className={styles.badgeSuccess}>Replied</span></td>
                                    <td>5h ago</td>
                                </tr>
                                <tr>
                                    <td>Sarah Smith</td>
                                    <td>Career Opportunity</td>
                                    <td><span className={styles.badgeSuccess}>Replied</span></td>
                                    <td>1d ago</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

// export default AdminPage;
