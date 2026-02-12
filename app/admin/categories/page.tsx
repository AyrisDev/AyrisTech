'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import AdminHeader from '../../../components/admin/AdminHeader';
import { categoryService } from '../../../services/category/categoryService';
import { Category } from '../../../types/database';
import styles from '../blog/AdminBlog.module.css'; // Reusing styles
import Link from 'next/link';

const AdminCategoriesPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCategories = async () => {
        const data = await categoryService.getAllCategories();
        setCategories(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this category?')) {
            const { error } = await categoryService.deleteCategory(id);
            if (error) {
                alert('Failed to delete category: ' + error.message);
            } else {
                fetchCategories();
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
                            <h1 className={styles.pageTitle}>Category Management</h1>
                            <p className={styles.pageSub}>Manage portfolio categories</p>
                        </div>
                        <Link href="/admin/categories/new" className={styles.primaryBtn}>
                            + New Category
                        </Link>
                    </div>

                    <div className={styles.tableSection}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>NAME (EN)</th>
                                    <th>NAME (TR)</th>
                                    <th>SLUG</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={4} style={{ textAlign: 'center' }}>Loading categories...</td></tr>
                                ) : categories.length === 0 ? (
                                    <tr><td colSpan={4} style={{ textAlign: 'center' }}>No categories found.</td></tr>
                                ) : (
                                    categories.map((cat) => (
                                        <tr key={cat.id}>
                                            <td style={{ fontWeight: 600 }}>{cat.name_en}</td>
                                            <td>{cat.name_tr}</td>
                                            <td>{cat.slug}</td>
                                            <td className={styles.actions}>
                                                <Link href={`/admin/categories/${cat.id}`} className={styles.editBtn}>Edit</Link>
                                                <button
                                                    className={styles.deleteBtn}
                                                    onClick={() => handleDelete(cat.id)}
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

export default AdminCategoriesPage;
