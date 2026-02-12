'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import AdminHeader from '../../../components/admin/AdminHeader';
import { createClient } from '../../../lib/supabase';
import styles from './AdminSettings.module.css';

const AdminSettingsPage = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        const getUser = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };
        getUser();
    }, []);

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        const supabase = createClient();
        const { error } = await supabase.auth.updateUser({
            password: passwordData.newPassword
        });

        if (error) {
            setMessage(`Error: ${error.message}`);
        } else {
            setMessage('Password updated successfully!');
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        }
    };

    return (
        <div className={styles.adminWrapper}>
            <AdminSidebar />
            <main className={styles.mainContent}>
                <AdminHeader />
                <div className={styles.container}>
                    <h1 className={styles.pageTitle}>Admin Settings</h1>
                    <p className={styles.pageSub}>Manage your account and preferences</p>

                    <div className={styles.settingsGrid}>
                        {/* Profile Info */}
                        <div className={styles.card}>
                            <h3 className={styles.cardTitle}>Profile Information</h3>
                            <div className={styles.infoRow}>
                                <div className={styles.label}>Email Address</div>
                                <div className={styles.value}>{loading ? 'Loading...' : user?.email}</div>
                            </div>
                            <div className={styles.infoRow}>
                                <div className={styles.label}>User ID</div>
                                <div className={styles.value}>{loading ? 'Loading...' : user?.id}</div>
                            </div>
                            <div className={styles.infoRow}>
                                <div className={styles.label}>Role</div>
                                <div className={styles.value}>{loading ? 'Loading...' : user?.role?.toUpperCase()}</div>
                            </div>
                        </div>

                        {/* Password Change */}
                        <div className={styles.card}>
                            <h3 className={styles.cardTitle}>Change Password</h3>
                            <form onSubmit={handlePasswordUpdate}>
                                <div className={styles.inputGroup}>
                                    <label>New Password</label>
                                    <input
                                        type="password"
                                        required
                                        minLength={6}
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                        placeholder="Enter new password"
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Confirm New Password</label>
                                    <input
                                        type="password"
                                        required
                                        minLength={6}
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                        placeholder="Confirm new password"
                                    />
                                </div>
                                {message && (
                                    <div className={message.includes('Error') || message.includes('match') ? styles.errorMsg : styles.successMsg}>
                                        {message}
                                    </div>
                                )}
                                <button type="submit" className={styles.saveBtn}>Update Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminSettingsPage;
