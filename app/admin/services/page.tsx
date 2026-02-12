'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import AdminHeader from '../../../components/admin/AdminHeader';
import { createClient } from '../../../lib/supabase';
import { getI18nEntry } from '../../../utils/i18n';
import styles from '../blog/AdminBlog.module.css'; // Reusing common admin table styles
import Link from 'next/link';

interface Service {
    id: string;
    slug: string;
    title: any;
    description: any;
    icon: string;
    order_index: number;
}

const AdminServicesPage = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            const supabase = createClient();
            const { data } = await supabase
                .from('services')
                .select('*')
                .order('order_index', { ascending: true });

            if (data) setServices(data);
            setLoading(false);
        };
        fetchServices();
    }, []);

    return (
        <div className={styles.adminWrapper}>
            <AdminSidebar />
            <main className={styles.mainContent}>
                <AdminHeader />
                <div className={styles.container}>
                    <div className={styles.pageHeader}>
                        <div>
                            <h1 className={styles.pageTitle}>Services Management</h1>
                            <p className={styles.pageSub}>Define and refine your core business offerings</p>
                        </div>
                        <Link href="/admin/services/new" className={styles.primaryBtn}>
                            + Add Service
                        </Link>
                    </div>

                    <div className={styles.tableSection}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>ICON</th>
                                    <th>TITLE</th>
                                    <th>DESCRIPTION (PREVIEW)</th>
                                    <th>ORDER</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={5} style={{ textAlign: 'center' }}>Loading services...</td></tr>
                                ) : services.length === 0 ? (
                                    <tr><td colSpan={5} style={{ textAlign: 'center' }}>No services defined yet.</td></tr>
                                ) : (
                                    services.map((service) => (
                                        <tr key={service.id}>
                                            <td style={{ fontSize: '1.5rem' }}>{service.icon || '🛠️'}</td>
                                            <td>
                                                <div className={styles.titleGroup}>
                                                    <span className={styles.trTitle}>{getI18nEntry(service.title, 'tr')}</span>
                                                    <span className={styles.enTitle}>{getI18nEntry(service.title, 'en')}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.enTitle} style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {getI18nEntry(service.description, 'tr')}
                                                </div>
                                            </td>
                                            <td>{service.order_index}</td>
                                            <td className={styles.actions}>
                                                <Link href={`/admin/services/${service.id}`} className={styles.editBtn}>Edit</Link>
                                                <button className={styles.deleteBtn}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminServicesPage;
