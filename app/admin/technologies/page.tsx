
'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import AdminHeader from '../../../components/admin/AdminHeader';
import { technologyService } from '../../../services/technology/technologyService';
import { Technology } from '../../../types/database';
import ImageUpload from '../../../components/admin/ui/ImageUpload';
import styles from './TechnologiesPage.module.css';

const TechnologiesPage = () => {
    const [technologies, setTechnologies] = useState<Technology[]>([]);
    const [loading, setLoading] = useState(true);
    const [newTech, setNewTech] = useState({ name: '', icon_url: '' });
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        loadTechnologies();
    }, []);

    const loadTechnologies = async () => {
        const data = await technologyService.getAllTechnologies();
        setTechnologies(data);
        setLoading(false);
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        const { error } = await technologyService.createTechnology(newTech);
        if (error) {
            alert('Error creating technology');
            console.error(error);
        } else {
            setNewTech({ name: '', icon_url: '' });
            loadTechnologies();
        }
        setCreating(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this technology?')) return;

        const { error } = await technologyService.deleteTechnology(id);
        if (error) {
            alert('Error deleting technology');
        } else {
            loadTechnologies();
        }
    };

    return (
        <div className={styles.adminWrapper}>
            <AdminSidebar />
            <main className={styles.mainContent}>
                <AdminHeader />
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Technologies</h1>
                    </div>

                    <div className={styles.content}>
                        {/* Create Form */}
                        <div className={styles.card}>
                            <h3 className={styles.cardTitle}>Add New Technology</h3>
                            <form onSubmit={handleCreate} className={styles.form}>
                                <div className={styles.inputGroup}>
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        value={newTech.name}
                                        onChange={e => setNewTech({ ...newTech, name: e.target.value })}
                                        required
                                        placeholder="e.g. Next.js"
                                        className={styles.input}
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Icon</label>
                                    <ImageUpload
                                        value={newTech.icon_url}
                                        onUpload={url => setNewTech({ ...newTech, icon_url: url })}
                                        label="Upload Icon"
                                    />
                                </div>
                                <button type="submit" disabled={creating} className={styles.saveBtn}>
                                    {creating ? 'Adding...' : 'Add Technology'}
                                </button>
                            </form>
                        </div>

                        {/* List */}
                        <div className={styles.listCard}>
                            <h3 className={styles.cardTitle}>Existing Technologies</h3>
                            {loading ? <div>Loading...</div> : (
                                <div className={styles.grid}>
                                    {technologies.map(tech => (
                                        <div key={tech.id} className={styles.techItem}>
                                            <div className={styles.techIcon}>
                                                {tech.icon_url ? (
                                                    <img src={tech.icon_url} alt={tech.name} />
                                                ) : (
                                                    <div className={styles.noIcon}>?</div>
                                                )}
                                            </div>
                                            <span className={styles.techName}>{tech.name}</span>
                                            <button
                                                onClick={() => handleDelete(tech.id)}
                                                className={styles.deleteBtn}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TechnologiesPage;
