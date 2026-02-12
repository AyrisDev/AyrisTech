'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../app/admin/blog/new/AdminEditor.module.css'; // Reusing styles
import { Post } from '../../types/database';

interface BlogEditorProps {
    initialData?: Partial<Post> | null;
    onSave: (data: any) => Promise<void>;
}

const BlogEditor = ({ initialData, onSave }: BlogEditorProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        slug: '',
        category: 'Engineering',
        read_time: '5 min',
        featured_image: '',
        is_published: false,
        title_tr: '',
        title_en: '',
        excerpt_tr: '',
        excerpt_en: '',
        content_tr: '',
        content_en: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                slug: initialData.slug || '',
                category: initialData.category || 'Engineering',
                read_time: initialData.read_time || '5 min',
                featured_image: initialData.featured_image || '',
                is_published: initialData.is_published || false,
                title_tr: typeof initialData.title === 'object' ? initialData.title.tr : '',
                title_en: typeof initialData.title === 'object' ? initialData.title.en : '',
                excerpt_tr: typeof initialData.excerpt === 'object' ? initialData.excerpt.tr : '',
                excerpt_en: typeof initialData.excerpt === 'object' ? initialData.excerpt.en : '',
                content_tr: typeof initialData.content === 'object' ? initialData.content.tr : '',
                content_en: typeof initialData.content === 'object' ? initialData.content.en : ''
            });
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave(formData);
        } catch (error) {
            console.error('Save failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.pageHeader}>
                <div>
                    <h1 className={styles.pageTitle}>{initialData ? 'Edit Post' : 'Create New Post'}</h1>
                    <p className={styles.pageSub}>Compose your thoughts for the world to see</p>
                </div>
                <div className={styles.actions}>
                    <button type="button" onClick={() => router.back()} className={styles.cancelBtn}>Cancel</button>
                    <button type="submit" disabled={loading} className={styles.saveBtn}>
                        {loading ? 'Saving...' : (initialData ? 'Update Post' : 'Publish Post')}
                    </button>
                </div>
            </div>

            <div className={styles.editorGrid}>
                <div className={styles.mainForms}>
                    {/* Turkish Content */}
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>🇹🇷 Türkçe İçerik</h3>
                        <div className={styles.inputGroup}>
                            <label>Başlık</label>
                            <input
                                type="text"
                                value={formData.title_tr}
                                onChange={e => setFormData({ ...formData, title_tr: e.target.value })}
                                placeholder="Makale başlığı..."
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Özet</label>
                            <textarea
                                value={formData.excerpt_tr}
                                onChange={e => setFormData({ ...formData, excerpt_tr: e.target.value })}
                                placeholder="Kısa özet..."
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>İçerik (Markdown/HTML)</label>
                            <textarea
                                className={styles.contentArea}
                                value={formData.content_tr}
                                onChange={e => setFormData({ ...formData, content_tr: e.target.value })}
                                placeholder="Makale içeriği..."
                                required
                            />
                        </div>
                    </div>

                    {/* English Content */}
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>🇺🇸 English Content</h3>
                        <div className={styles.inputGroup}>
                            <label>Title</label>
                            <input
                                type="text"
                                value={formData.title_en}
                                onChange={e => setFormData({ ...formData, title_en: e.target.value })}
                                placeholder="Article title..."
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Excerpt</label>
                            <textarea
                                value={formData.excerpt_en}
                                onChange={e => setFormData({ ...formData, excerpt_en: e.target.value })}
                                placeholder="Short summary..."
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Content (Markdown/HTML)</label>
                            <textarea
                                className={styles.contentArea}
                                value={formData.content_en}
                                onChange={e => setFormData({ ...formData, content_en: e.target.value })}
                                placeholder="Article content..."
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.sidebar}>
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Settings</h3>
                        <div className={styles.inputGroup}>
                            <label>Slug (URL)</label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                placeholder="my-cool-post"
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Category</label>
                            <select
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option>Engineering</option>
                                <option>Strategy</option>
                                <option>Design</option>
                                <option>Company</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Read Time</label>
                            <input
                                type="text"
                                value={formData.read_time}
                                onChange={e => setFormData({ ...formData, read_time: e.target.value })}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Featured Image URL</label>
                            <input
                                type="text"
                                value={formData.featured_image}
                                onChange={e => setFormData({ ...formData, featured_image: e.target.value })}
                            />
                        </div>
                        <div className={styles.checkboxGroup}>
                            <input
                                type="checkbox"
                                id="publish"
                                checked={formData.is_published}
                                onChange={e => setFormData({ ...formData, is_published: e.target.checked })}
                            />
                            <label htmlFor="publish">Publish immediately</label>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default BlogEditor;
