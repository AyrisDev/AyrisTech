'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../app/admin/blog/new/AdminEditor.module.css'; // Reusing styles
import { Category } from '../../types/database';

interface CategoryEditorProps {
    initialData?: Category | null;
    onSave: (data: any) => Promise<void>;
}

const CategoryEditor = ({ initialData, onSave }: CategoryEditorProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name_en: '',
        name_tr: '',
        slug: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name_en: initialData.name_en || '',
                name_tr: initialData.name_tr || '',
                slug: initialData.slug || ''
            });
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave(formData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = (text: string) => {
        return text.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.pageHeader}>
                <div>
                    <h1 className={styles.pageTitle}>{initialData ? 'Edit Category' : 'New Category'}</h1>
                    <p className={styles.pageSub}>Define a category for your portfolio</p>
                </div>
                <div className={styles.actions}>
                    <button type="button" onClick={() => router.back()} className={styles.cancelBtn}>Cancel</button>
                    <button type="submit" disabled={loading} className={styles.saveBtn}>
                        {loading ? 'Saving...' : 'Save Category'}
                    </button>
                </div>
            </div>

            <div className={styles.editorGrid}>
                <div className={styles.mainForms}>
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Category Details</h3>

                        <div className={styles.inputGroup}>
                            <label>Name (English)</label>
                            <input
                                type="text"
                                value={formData.name_en}
                                onChange={e => {
                                    const val = e.target.value;
                                    setFormData(prev => ({
                                        ...prev,
                                        name_en: val,
                                        // Auto-generate slug if it's new and clean
                                        slug: !initialData ? generateSlug(val) : prev.slug
                                    }));
                                }}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Name (Turkish)</label>
                            <input
                                type="text"
                                value={formData.name_tr}
                                onChange={e => setFormData({ ...formData, name_tr: e.target.value })}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Slug (URL friendly)</label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CategoryEditor;
