'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import AdminHeader from '../../../components/admin/AdminHeader';
import { createClient } from '../../../lib/supabase';
import styles from '../blog/AdminBlog.module.css'; // Reusing base styles
import contactStyles from './AdminContacts.module.css';
import Link from 'next/link';

interface Submission {
    id: string;
    full_name: string;
    email: string;
    subject: string;
    message: string;
    status: string;
    created_at: string;
}

const AdminContactsPage = () => {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMsg, setSelectedMsg] = useState<Submission | null>(null);

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        const supabase = createClient();
        const { data } = await supabase
            .from('contact_submissions')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setSubmissions(data);
        setLoading(false);
    };

    const updateStatus = async (id: string, status: string) => {
        const supabase = createClient();
        await supabase.from('contact_submissions').update({ status }).eq('id', id);
        fetchSubmissions();
    };

    return (
        <div className={styles.adminWrapper}>
            <AdminSidebar />
            <main className={styles.mainContent}>
                <AdminHeader />
                <div className={styles.container}>
                    <div className={styles.pageHeader}>
                        <div>
                            <h1 className={styles.pageTitle}>Inbox</h1>
                            <p className={styles.pageSub}>Client inquiries and project proposals</p>
                        </div>
                    </div>

                    <div className={contactStyles.inboxGrid}>
                        <div className={styles.tableSection}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>SENDER</th>
                                        <th>SUBJECT</th>
                                        <th>DATE</th>
                                        <th>STATUS</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td colSpan={5} style={{ textAlign: 'center' }}>Loading inquiries...</td></tr>
                                    ) : submissions.length === 0 ? (
                                        <tr><td colSpan={5} style={{ textAlign: 'center' }}>No inquiries yet.</td></tr>
                                    ) : (
                                        submissions.map((sub) => (
                                            <tr key={sub.id} className={selectedMsg?.id === sub.id ? contactStyles.activeRow : ''}>
                                                <td>
                                                    <div className={styles.titleGroup}>
                                                        <span className={styles.trTitle}>{sub.full_name}</span>
                                                        <span className={styles.enTitle}>{sub.email}</span>
                                                    </div>
                                                </td>
                                                <td>{sub.subject}</td>
                                                <td>{new Date(sub.created_at).toLocaleDateString()}</td>
                                                <td>
                                                    <span className={`${styles.badgeSuccess} ${sub.status === 'new' ? contactStyles.badgeNew : ''}`}>
                                                        {sub.status.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className={styles.actions}>
                                                    <button
                                                        className={styles.editBtn}
                                                        onClick={() => {
                                                            setSelectedMsg(sub);
                                                            if (sub.status === 'new') updateStatus(sub.id, 'read');
                                                        }}
                                                    >
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Message Detail View */}
                        <div className={contactStyles.messagePanel}>
                            {selectedMsg ? (
                                <div className={contactStyles.messageCard}>
                                    <div className={contactStyles.msgHeader}>
                                        <h3>{selectedMsg.subject || 'No Subject'}</h3>
                                        <span className={contactStyles.msgDate}>{new Date(selectedMsg.created_at).toLocaleString()}</span>
                                    </div>
                                    <div className={contactStyles.senderInfo}>
                                        <strong>From:</strong> {selectedMsg.full_name} ({selectedMsg.email})
                                    </div>
                                    <div className={contactStyles.msgBody}>
                                        {selectedMsg.message}
                                    </div>
                                    <div className={contactStyles.msgActions}>
                                        <button className={styles.primaryBtn}>Reply via Email</button>
                                        <button
                                            className={styles.deleteBtn}
                                            onClick={() => updateStatus(selectedMsg.id, 'archived')}
                                        >
                                            Archive
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className={contactStyles.emptyState}>
                                    <div className={contactStyles.emptyIcon}>📩</div>
                                    <p>Select a message to view details</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminContactsPage;
