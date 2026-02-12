'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '../../../../components/admin/AdminSidebar';
import AdminHeader from '../../../../components/admin/AdminHeader';
import BlogEditor from '../../../../components/admin/BlogEditor';
import { blogService } from '../../../../services/blog/blogService';
import { useRouter, useParams } from 'next/navigation';
import { Post } from '../../../../types/database';
import styles from '../new/AdminEditor.module.css'; // Reusing styles

const EditBlogPost = () => {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) return;
            const data = await blogService.getPostById(id);
            setPost(data);
            setLoading(false);
        };
        fetchPost();
    }, [id]);

    const handleSave = async (formData: any) => {
        const { error } = await blogService.updatePost(id, {
            slug: formData.slug || formData.title_en.toLowerCase().replace(/ /g, '-'),
            category: formData.category,
            read_time: formData.read_time,
            featured_image: formData.featured_image,
            is_published: formData.is_published,
            title: { tr: formData.title_tr, en: formData.title_en },
            excerpt: { tr: formData.excerpt_tr, en: formData.excerpt_en },
            content: { tr: formData.content_tr, en: formData.content_en }
        });

        if (error) {
            alert(error.message);
            throw error;
        } else {
            router.push('/admin/blog');
        }
    };

    if (loading) {
        return <div style={{ color: 'white', padding: '2rem' }}>Loading post...</div>;
    }

    if (!post) {
        return <div style={{ color: 'white', padding: '2rem' }}>Post not found</div>;
    }

    return (
        <div className={styles.adminWrapper}>
            <AdminSidebar />
            <main className={styles.mainContent}>
                <AdminHeader />
                <div className={styles.container}>
                    <BlogEditor initialData={post} onSave={handleSave} />
                </div>
            </main>
        </div>
    );
};

export default EditBlogPost;
