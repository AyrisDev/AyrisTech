'use client';

import { useState } from 'react';
import AdminSidebar from '../../../../components/admin/AdminSidebar';
import AdminHeader from '../../../../components/admin/AdminHeader';
import { createClient } from '../../../../lib/supabase';
import { useRouter } from 'next/navigation';
import styles from '../../blog/new/AdminEditor.module.css';

const NewServicePage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        slug: '',
        icon: '🚀',
        order_index: 0,
        title_tr: '',
        title_en: '',
        desc_tr: '',
        desc_en: '',
        features_tr: '', // Comma separated for now
        features_en: ''
    });

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const supabase = createClient();

        const features_tr_arr = formData.features_tr.split(',').map(f => f.trim());
        const features_en_arr = formData.features_en.split(',').map(f => f.trim());

        // Combine features into jsonb structure
        const features = features_tr_arr.map((tr, index) => ({
            tr,
            en: features_en_arr[index] || tr
        }));

        const { error } = await supabase.from('services').insert([{
            slug: formData.slug || formData.title_en.toLowerCase().replace(/ /g, '-'),
            icon: formData.icon,
            order_index: formData.order_index,
            title: { tr: formData.title_tr, en: formData.title_en },
            description: { tr: formData.desc_tr, en: formData.desc_en },
            features: features,
            created_at: new Date().toISOString()
        }]);

        if (error) {
            alert(error.message);
            setLoading(false);
        } else {
            router.push('/admin/services');
        }
    };

    return (
        <div className={styles.adminWrapper}>
            <AdminSidebar />
            <main className={styles.mainContent}>
                <AdminHeader />
                <div className={styles.container}>
                    <form onSubmit={handleSave}>
                        <div className={styles.pageHeader}>
                            <div>
                                <h1 className={styles.pageTitle}>Add New Service</h1>
                                <p className={styles.pageSub}>Define a new specialized offering for Ayris Tech</p>
                            </div>
                            <div className={styles.actions}>
                                <button type="button" onClick={() => router.back()} className={styles.cancelBtn}>Cancel</button>
                                <button type="submit" disabled={loading} className={styles.saveBtn}>
                                    {loading ? 'Saving...' : 'Deploy Service'}
                                </button>
                            </div>
                        </div>

                        <div className={styles.editorGrid}>
                            <div className={styles.mainForms}>
                                {/* Turkish */}
                                <div className={styles.card}>
                                    <h3 className={styles.cardTitle}>🇹🇷 Türkçe Detaylar</h3>
                                    <div className={styles.inputGroup}>
                                        <label>Hizmet Başlığı</label>
                                        <input type="text" value={formData.title_tr} onChange={e => setFormData({ ...formData, title_tr: e.target.value })} placeholder="Örn: Yapay Zeka Çözümleri" required />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Açıklama</label>
                                        <textarea value={formData.desc_tr} onChange={e => setFormData({ ...formData, desc_tr: e.target.value })} placeholder="Kısa hizmet açıklaması..." required />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Özellikler (Virgülle ayırın)</label>
                                        <textarea value={formData.features_tr} onChange={e => setFormData({ ...formData, features_tr: e.target.value })} placeholder="NLP, Veri Madenciliği, Chatbot..." />
                                    </div>
                                </div>

                                {/* English */}
                                <div className={styles.card}>
                                    <h3 className={styles.cardTitle}>🇺🇸 English Details</h3>
                                    <div className={styles.inputGroup}>
                                        <label>Service Title</label>
                                        <input type="text" value={formData.title_en} onChange={e => setFormData({ ...formData, title_en: e.target.value })} placeholder="e.g. AI Solutions" required />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Description</label>
                                        <textarea value={formData.desc_en} onChange={e => setFormData({ ...formData, desc_en: e.target.value })} placeholder="Short service description..." required />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Features (Comma separated)</label>
                                        <textarea value={formData.features_en} onChange={e => setFormData({ ...formData, features_en: e.target.value })} placeholder="NLP, Data Mining, Chatbot..." />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.sidebar}>
                                <div className={styles.card}>
                                    <h3 className={styles.cardTitle}>Service Core</h3>
                                    <div className={styles.inputGroup}>
                                        <label>Slug (URL)</label>
                                        <input type="text" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} placeholder="ai-solutions" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Icon</label>
                                        <div className={styles.iconPreview} style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '1rem' }}>
                                            {formData.icon}
                                        </div>
                                        <div className={styles.iconGrid}>
                                            {[
                                                '🚀', '💻', '📱', '🧠', '⚙️', '🛡️', '☁️', '🎮', '📦', '🛠️',
                                                '🔬', '📡', '🔌', '💾', '🖱️', '🎨', '📹', '🔐', '🌐', '📊',
                                                '📈', '📣', '📢', '💼', '🏢', '🤖', '👾', '🐛', '🕸️', '🐍',
                                                '☕', '⚛️', '⌚', '📸', '🎥', '🎬', '🎯', '💡', '💎', '🔥'
                                            ].map((icon) => (
                                                <button
                                                    key={icon}
                                                    type="button"
                                                    className={`${styles.iconBtn} ${formData.icon === icon ? styles.iconBtnActive : ''}`}
                                                    onClick={() => setFormData({ ...formData, icon })}
                                                >
                                                    {icon}
                                                </button>
                                            ))}
                                        </div>
                                        <input
                                            type="text"
                                            value={formData.icon}
                                            onChange={e => setFormData({ ...formData, icon: e.target.value })}
                                            placeholder="Or type custom emoji"
                                            style={{ marginTop: '0.5rem' }}
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Display Order</label>
                                        <input type="number" value={formData.order_index} onChange={e => setFormData({ ...formData, order_index: parseInt(e.target.value) })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default NewServicePage;
