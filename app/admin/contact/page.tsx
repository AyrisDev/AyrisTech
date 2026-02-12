
'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import AdminHeader from '../../../components/admin/AdminHeader';
import { contactService } from '../../../services/contact/contactService';
import { ContactInfo } from '../../../types/database';
import styles from './ContactPage.module.css';

const ContactPage = () => {
    const [info, setInfo] = useState<ContactInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadInfo();
    }, []);

    const loadInfo = async () => {
        const data = await contactService.getContactInfo();
        setInfo(data);
        setLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!info) return;

        setSaving(true);
        const { error } = await contactService.updateContactInfo(info.id, {
            email: info.email,
            phone: info.phone,
            address: info.address,
            hours: info.hours,
            social_links: info.social_links
        });

        if (error) {
            alert('Error saving info');
            console.error(error);
        } else {
            alert('Settings saved successfully');
        }
        setSaving(false);
    };

    const handleChange = (field: keyof ContactInfo, value: any) => {
        if (!info) return;
        setInfo({ ...info, [field]: value });
    };

    const handleI18nChange = (field: 'address' | 'hours', locale: 'en' | 'tr', value: string) => {
        if (!info) return;
        setInfo({
            ...info,
            [field]: {
                ...(typeof info[field] === 'string' ? { en: info[field] as string, tr: '' } : info[field] as any),
                [locale]: value
            }
        });
    };

    const handleSocialChange = (key: string, value: string) => {
        if (!info) return;
        setInfo({
            ...info,
            social_links: {
                ...info.social_links,
                [key]: value
            }
        });
    };

    if (loading) return <div style={{ color: '#fff', padding: '2rem' }}>Loading...</div>;

    return (
        <div className={styles.adminWrapper}>
            <AdminSidebar />
            <main className={styles.mainContent}>
                <AdminHeader />
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Contact Details</h1>
                    </div>

                    <div className={styles.content}>
                        <form onSubmit={handleSave} className={styles.form}>
                            {/* General */}
                            <div className={styles.section}>
                                <h3 className={styles.sectionTitle}>General Information</h3>
                                <div className={styles.row}>
                                    <div className={styles.inputGroup}>
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            value={info?.email || ''}
                                            onChange={e => handleChange('email', e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Phone</label>
                                        <input
                                            type="text"
                                            value={info?.phone || ''}
                                            onChange={e => handleChange('phone', e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Address */}
                            <div className={styles.section}>
                                <h3 className={styles.sectionTitle}>Address</h3>
                                <div className={styles.row}>
                                    <div className={styles.inputGroup}>
                                        <label>English</label>
                                        <input
                                            type="text"
                                            value={(info?.address as any)?.en || ''}
                                            onChange={e => handleI18nChange('address', 'en', e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Turkish</label>
                                        <input
                                            type="text"
                                            value={(info?.address as any)?.tr || ''}
                                            onChange={e => handleI18nChange('address', 'tr', e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Hours */}
                            <div className={styles.section}>
                                <h3 className={styles.sectionTitle}>Working Hours</h3>
                                <div className={styles.row}>
                                    <div className={styles.inputGroup}>
                                        <label>English</label>
                                        <input
                                            type="text"
                                            value={(info?.hours as any)?.en || ''}
                                            onChange={e => handleI18nChange('hours', 'en', e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Turkish</label>
                                        <input
                                            type="text"
                                            value={(info?.hours as any)?.tr || ''}
                                            onChange={e => handleI18nChange('hours', 'tr', e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Socials */}
                            <div className={styles.section}>
                                <h3 className={styles.sectionTitle}>Social Media Links</h3>
                                <div className={styles.row}>
                                    <div className={styles.inputGroup}>
                                        <label>Twitter (X)</label>
                                        <input
                                            type="text"
                                            value={info?.social_links?.twitter || ''}
                                            onChange={e => handleSocialChange('twitter', e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>LinkedIn</label>
                                        <input
                                            type="text"
                                            value={info?.social_links?.linkedin || ''}
                                            onChange={e => handleSocialChange('linkedin', e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.inputGroup}>
                                        <label>Instagram</label>
                                        <input
                                            type="text"
                                            value={info?.social_links?.instagram || ''}
                                            onChange={e => handleSocialChange('instagram', e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>GitHub</label>
                                        <input
                                            type="text"
                                            value={info?.social_links?.github || ''}
                                            onChange={e => handleSocialChange('github', e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button type="submit" disabled={saving} className={styles.saveBtn}>
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ContactPage;
