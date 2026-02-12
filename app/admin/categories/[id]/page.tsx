'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '../../../../components/admin/AdminSidebar';
import AdminHeader from '../../../../components/admin/AdminHeader';
import CategoryEditor from '../../../../components/admin/CategoryEditor';
import { categoryService } from '../../../../services/category/categoryService';
import { useRouter, useParams } from 'next/navigation';
import { Category } from '../../../../types/database';
import styles from '../../blog/AdminBlog.module.css';

const EditCategoryPage = () => {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategory = async () => {
            if (!id) return;
            const data = await categoryService.getCategoryById(id);
            setCategory(data);
            setLoading(false);
        };
        fetchCategory();
    }, [id]);

    const handleSave = async (formData: any) => {
        const { error } = await categoryService.updateCategory(id, formData);

        if (error) {
            alert(error.message);
            throw error;
        } else {
            router.push('/admin/categories');
        }
    };

    if (loading) {
        return <div style={{ color: 'white', padding: '2rem' }}>Loading category...</div>;
    }

    if (!category) {
        return <div style={{ color: 'white', padding: '2rem' }}>Category not found</div>;
    }

    return (
        <div className={styles.adminWrapper}>
            <AdminSidebar />
            <main className={styles.mainContent}>
                <AdminHeader />
                <div className={styles.container}>
                    <CategoryEditor initialData={category} onSave={handleSave} />
                </div>
            </main>
        </div>
    );
};

export default EditCategoryPage;
