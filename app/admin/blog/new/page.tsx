'use client';

import AdminSidebar from '../../../../components/admin/AdminSidebar';
import AdminHeader from '../../../../components/admin/AdminHeader';
import BlogEditor from '../../../../components/admin/BlogEditor';
import { blogService } from '../../../../services/blog/blogService';
import { useRouter } from 'next/navigation';
import styles from './AdminEditor.module.css';

const NewBlogPost = () => {
    const router = useRouter();

    const handleSave = async (formData: any) => {
        const { data, error } = await blogService.createPost({
            slug: formData.slug || formData.title_en.toLowerCase().replace(/ /g, '-'),
            category: formData.category,
            read_time: formData.read_time,
            featured_image: formData.featured_image,
            is_published: formData.is_published,
            title: { tr: formData.title_tr, en: formData.title_en },
            excerpt: { tr: formData.excerpt_tr, en: formData.excerpt_en },
            content: { tr: formData.content_tr, en: formData.content_en },
            published_at: new Date().toISOString()
        });

        if (error) {
            alert(error.message);
            throw error;
        } else {
            router.push('/admin/blog');
        }
    };

    return (
        <div className={styles.adminWrapper}>
            <AdminSidebar />
            <main className={styles.mainContent}>
                <AdminHeader />
                <div className={styles.container}>
                    <BlogEditor onSave={handleSave} />
                </div>
            </main>
        </div>
    );
};

export default NewBlogPost;
