'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import AdminHeader from '../../../components/admin/AdminHeader';
import { portfolioService } from '../../../services/portfolio/portfolioService';
import { Project } from '../../../types/database';
import { getI18nEntry } from '../../../utils/i18n';
import styles from '../blog/AdminBlog.module.css'; // Reusing styles
import Link from 'next/link';

const AdminPortfolioPage = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        const data = await portfolioService.getAllProjects();
        setProjects(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this project?')) {
            const { error } = await portfolioService.deleteProject(id);
            if (error) {
                alert('Failed to delete project: ' + error.message);
            } else {
                fetchProjects();
            }
        }
    };

    return (
        <div className={styles.adminWrapper}>
            <AdminSidebar />
            <main className={styles.mainContent}>
                <AdminHeader />
                <div className={styles.container}>
                    <div className={styles.pageHeader}>
                        <div>
                            <h1 className={styles.pageTitle}>Portfolio Management</h1>
                            <p className={styles.pageSub}>Showcase your best engineering and design works</p>
                        </div>
                        <Link href="/admin/portfolio/new" className={styles.primaryBtn}>
                            + New Project
                        </Link>
                    </div>

                    <div className={styles.tableSection}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>IMAGE</th>
                                    <th>TITLE</th>
                                    <th>CATEGORY</th>
                                    <th>YEAR</th>
                                    <th>FEATURED</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={6} style={{ textAlign: 'center' }}>Loading projects...</td></tr>
                                ) : projects.length === 0 ? (
                                    <tr><td colSpan={6} style={{ textAlign: 'center' }}>No projects found.</td></tr>
                                ) : (
                                    projects.map((project) => (
                                        <tr key={project.id}>
                                            <td>
                                                <div className={styles.postThumb} style={{ backgroundImage: `url(${project.main_image})` }}></div>
                                            </td>
                                            <td>
                                                <div className={styles.titleGroup}>
                                                    <span className={styles.trTitle}>{getI18nEntry(project.title, 'tr')}</span>
                                                    <span className={styles.enTitle}>{getI18nEntry(project.title, 'en')}</span>
                                                </div>
                                            </td>
                                            <td>{project.category}</td>
                                            <td>{project.year}</td>
                                            <td>
                                                {project.is_featured ? (
                                                    <span className={styles.badgeSuccess}>Featured</span>
                                                ) : (
                                                    <span className={styles.badgeDraft}>Standard</span>
                                                )}
                                            </td>
                                            <td className={styles.actions}>
                                                <Link href={`/admin/portfolio/${project.id}`} className={styles.editBtn}>Edit</Link>
                                                <button
                                                    className={styles.deleteBtn}
                                                    onClick={() => handleDelete(project.id)}
                                                >
                                                    Delete
                                                </button>
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

export default AdminPortfolioPage;
