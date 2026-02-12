'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../app/admin/blog/new/AdminEditor.module.css'; // Reusing styles
import { Project, Category } from '../../types/database';
import { categoryService } from '../../services/category/categoryService';
import ImageUpload from './ui/ImageUpload';
import MultiImageUpload from './ui/MultiImageUpload';
import MultiSelectTechnologies from './ui/MultiSelectTechnologies';

interface PortfolioEditorProps {
    initialData?: Partial<Project> | null;
    onSave: (data: any) => Promise<void>;
}

const PortfolioEditor = ({ initialData, onSave }: PortfolioEditorProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState({
        slug: '',
        category: '',
        year: '' + new Date().getFullYear(),
        client: '',
        website_url: '',
        main_image: '',
        is_featured: false,

        // Multi-lang fields
        title_tr: '',
        title_en: '',
        desc_tr: '',
        desc_en: '',
        role_tr: '',
        role_en: '',
        sector_tr: '',
        sector_en: '',
        overview_tr: '',
        overview_en: '',
        challenge_tr: '',
        challenge_en: '',
        solution_tr: '',
        solution_en: '',

        // JSONB Arrays
        visuals: [] as string[],
        impact_stats: [{ label_en: 'Users', label_tr: 'Kullanıcı', value: '+100k' }],
        technologies: [] as string[],
        technology_ids: [] as string[], // New field for relations
        testimonial_quote_en: '',
        testimonial_quote_tr: '',
        testimonial_author: '',
        testimonial_role: ''
    });


    useEffect(() => {
        // Fetch categories for dropdown
        const loadCategories = async () => {
            const data = await categoryService.getAllCategories();
            setCategories(data);
            // Set default category if creating new and no category selected yet
            if (!initialData && data.length > 0 && !formData.category) {
                setFormData(prev => ({ ...prev, category: data[0].slug }));
            }
        };
        loadCategories();
    }, []); // Run once on mount

    useEffect(() => {
        if (initialData) {
            // Helper to safe access nested i18n
            const getT = (obj: any, lang: string) => typeof obj === 'object' ? obj[lang] || '' : obj || '';

            setFormData({
                slug: initialData.slug || '',
                category: initialData.category || '',
                year: initialData.year || '',
                client: initialData.client || '',
                website_url: initialData.website_url || '',
                main_image: initialData.main_image || '',
                is_featured: initialData.is_featured || false,

                title_tr: getT(initialData.title, 'tr'),
                title_en: getT(initialData.title, 'en'),
                desc_tr: getT(initialData.description, 'tr'),
                desc_en: getT(initialData.description, 'en'),
                role_tr: getT(initialData.role, 'tr'),
                role_en: getT(initialData.role, 'en'),
                sector_tr: getT(initialData.sector, 'tr'),
                sector_en: getT(initialData.sector, 'en'),
                overview_tr: getT(initialData.overview, 'tr'),
                overview_en: getT(initialData.overview, 'en'),
                challenge_tr: getT(initialData.challenge, 'tr'),
                challenge_en: getT(initialData.challenge, 'en'),
                solution_tr: getT(initialData.solution, 'tr'),
                solution_en: getT(initialData.solution, 'en'),

                visuals: initialData.visuals || [],
                impact_stats: initialData.impact_stats?.map((s: any) => ({
                    label_en: s.label?.en || '',
                    label_tr: s.label?.tr || '',
                    value: s.value || ''
                })) || [{ label_en: '', label_tr: '', value: '' }],

                // Load legacy cached string array, optionally override if real relations exist
                technologies: initialData.technologies || [],

                // Load relations if available
                technology_ids: initialData.technologies_data?.map(t => t.id) || [],

                testimonial_quote_en: initialData.testimonial?.quote?.en || '',
                testimonial_quote_tr: initialData.testimonial?.quote?.tr || '',
                testimonial_author: initialData.testimonial?.author || '',
                testimonial_role: initialData.testimonial?.role || ''
            });
        }
    }, [initialData]);

    const handleStatsChange = (index: number, field: string, value: string) => {
        const newStats = [...formData.impact_stats];
        // @ts-ignore
        newStats[index] = { ...newStats[index], [field]: value };
        setFormData({ ...formData, impact_stats: newStats });
    };

    const addStat = () => {
        setFormData({
            ...formData,
            impact_stats: [...formData.impact_stats, { label_en: '', label_tr: '', value: '' }]
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('PortfolioEditor submitting formData:', formData); // Debug log
        setLoading(true);
        try {
            await onSave(formData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.pageHeader}>
                <div>
                    <h1 className={styles.pageTitle}>{initialData ? 'Edit Project' : 'Add New Project'}</h1>
                    <p className={styles.pageSub}>Document a successful case study</p>
                </div>
                <div className={styles.actions}>
                    <button type="button" onClick={() => router.back()} className={styles.cancelBtn}>Cancel</button>
                    <button type="submit" disabled={loading} className={styles.saveBtn}>
                        {loading ? 'Saving...' : 'Save Case Study'}
                    </button>
                </div>
            </div>

            <div className={styles.editorGrid}>
                <div className={styles.mainForms}>
                    {/* Turkish Details */}
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>🇹🇷 Türkçe Detaylar</h3>
                        <div className={styles.inputGroup}>
                            <label>Proje Başlığı</label>
                            <input type="text" value={formData.title_tr} onChange={e => setFormData({ ...formData, title_tr: e.target.value })} required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Kısa Açıklama (Liste görünümü için)</label>
                            <textarea value={formData.desc_tr} onChange={e => setFormData({ ...formData, desc_tr: e.target.value })} required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Sektör</label>
                            <input type="text" value={formData.sector_tr} onChange={e => setFormData({ ...formData, sector_tr: e.target.value })} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Rol</label>
                            <input type="text" value={formData.role_tr} onChange={e => setFormData({ ...formData, role_tr: e.target.value })} placeholder="Örn: UI/UX Tasarım & Geliştirme" />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Genel Bakış (Overview)</label>
                            <textarea value={formData.overview_tr} onChange={e => setFormData({ ...formData, overview_tr: e.target.value })} className={styles.contentArea} style={{ minHeight: '150px' }} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>The Challenge</label>
                            <textarea value={formData.challenge_tr} onChange={e => setFormData({ ...formData, challenge_tr: e.target.value })} className={styles.contentArea} style={{ minHeight: '150px' }} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>The Solution</label>
                            <textarea value={formData.solution_tr} onChange={e => setFormData({ ...formData, solution_tr: e.target.value })} className={styles.contentArea} style={{ minHeight: '150px' }} />
                        </div>
                    </div>

                    {/* English Details */}
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>🇺🇸 English Details</h3>
                        <div className={styles.inputGroup}>
                            <label>Project Title</label>
                            <input type="text" value={formData.title_en} onChange={e => setFormData({ ...formData, title_en: e.target.value })} required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Short Description (For grid view)</label>
                            <textarea value={formData.desc_en} onChange={e => setFormData({ ...formData, desc_en: e.target.value })} required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Sector</label>
                            <input type="text" value={formData.sector_en} onChange={e => setFormData({ ...formData, sector_en: e.target.value })} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Role</label>
                            <input type="text" value={formData.role_en} onChange={e => setFormData({ ...formData, role_en: e.target.value })} placeholder="e.g. UI/UX Design & Development" />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Overview</label>
                            <textarea value={formData.overview_en} onChange={e => setFormData({ ...formData, overview_en: e.target.value })} className={styles.contentArea} style={{ minHeight: '150px' }} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>The Challenge</label>
                            <textarea value={formData.challenge_en} onChange={e => setFormData({ ...formData, challenge_en: e.target.value })} className={styles.contentArea} style={{ minHeight: '150px' }} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>The Solution</label>
                            <textarea value={formData.solution_en} onChange={e => setFormData({ ...formData, solution_en: e.target.value })} className={styles.contentArea} style={{ minHeight: '150px' }} />
                        </div>
                    </div>

                    {/* Additional Content Blocks */}
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Impact Statistics</h3>
                        {formData.impact_stats.map((stat, i) => (
                            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                <input type="text" placeholder="Value (+300%)" value={stat.value} onChange={(e) => handleStatsChange(i, 'value', e.target.value)} className={styles.input} />
                                <input type="text" placeholder="Label (EN)" value={stat.label_en} onChange={(e) => handleStatsChange(i, 'label_en', e.target.value)} className={styles.input} />
                                <input type="text" placeholder="Label (TR)" value={stat.label_tr} onChange={(e) => handleStatsChange(i, 'label_tr', e.target.value)} className={styles.input} />
                            </div>
                        ))}
                        <button type="button" onClick={addStat} className={styles.secondaryBtn} style={{ marginTop: '0.5rem' }}>+ Add Stat</button>
                    </div>

                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Client Testimonial</h3>
                        <div className={styles.inputGroup}>
                            <label>Author Name</label>
                            <input type="text" value={formData.testimonial_author} onChange={e => setFormData({ ...formData, testimonial_author: e.target.value })} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Author Role</label>
                            <input type="text" value={formData.testimonial_role} onChange={e => setFormData({ ...formData, testimonial_role: e.target.value })} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Quote (TR)</label>
                            <textarea value={formData.testimonial_quote_tr} onChange={e => setFormData({ ...formData, testimonial_quote_tr: e.target.value })} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Quote (EN)</label>
                            <textarea value={formData.testimonial_quote_en} onChange={e => setFormData({ ...formData, testimonial_quote_en: e.target.value })} />
                        </div>
                    </div>
                </div>

                <div className={styles.sidebar}>
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Metadata</h3>
                        <div className={styles.inputGroup}>
                            <label>Client</label>
                            <input type="text" value={formData.client} onChange={e => setFormData({ ...formData, client: e.target.value })} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Website URL</label>
                            <input type="url" value={formData.website_url} onChange={e => setFormData({ ...formData, website_url: e.target.value })} placeholder="https://..." />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Category</label>
                            <select
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                className={styles.select}
                                style={{ width: '100%', padding: '0.75rem', background: '#222', border: '1px solid #333', color: 'white', borderRadius: '8px' }}
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.slug}>{cat.name_en} / {cat.name_tr}</option>
                                ))}
                            </select>
                            <small style={{ color: '#666', marginTop: '0.2rem', display: 'block' }}>Manage categories in the Categories page.</small>
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Year</label>
                            <input type="text" value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} />
                        </div>

                        <ImageUpload
                            label="Main Image"
                            value={formData.main_image}
                            onUpload={(url) => setFormData({ ...formData, main_image: url })}
                        />

                        <MultiImageUpload
                            label="Gallery Images"
                            values={formData.visuals}
                            onUpload={(urls) => setFormData({ ...formData, visuals: urls })}
                        />

                        <MultiSelectTechnologies
                            selectedIds={formData.technology_ids}
                            onChange={(ids, names) => setFormData({ ...formData, technology_ids: ids, technologies: names })}
                        />

                        <div className={styles.checkboxGroup}>
                            <input type="checkbox" id="featured" checked={formData.is_featured} onChange={e => setFormData({ ...formData, is_featured: e.target.checked })} />
                            <label htmlFor="featured">Feature on homepage</label>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PortfolioEditor;
