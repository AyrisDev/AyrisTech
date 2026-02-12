'use client';

import AdminSidebar from '../../../../components/admin/AdminSidebar';
import AdminHeader from '../../../../components/admin/AdminHeader';
import CategoryEditor from '../../../../components/admin/CategoryEditor';
import { categoryService } from '../../../../services/category/categoryService';
import { useRouter } from 'next/navigation';
import styles from '../../blog/AdminBlog.module.css';

const NewCategoryPage = () => {
    const router = useRouter();

    const handleSave = async (formData: any) => {
        const { error } = await categoryService.createCategory(formData);

        if (error) {
            alert(error.message);
            throw error;
        } else {
            router.push('/admin/categories');
        }
    };

    return (
        <div className={styles.adminWrapper}>
            <AdminSidebar />
            <main className={styles.mainContent}>
                <AdminHeader />
                <div className={styles.container}>
                    <CategoryEditor onSave={handleSave} />
                </div>
            </main>
        </div>
    );
};

export default NewCategoryPage;
