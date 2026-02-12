'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import AdminHeader from '../../../components/admin/AdminHeader';
import { blogService } from '../../../services/blog/blogService';
import { Post } from '../../../types/database';
import { getI18nEntry } from '../../../utils/i18n';
import styles from './AdminBlog.module.css';
import Link from 'next/link';

const AdminBlogPage = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const data = await blogService.getAllPosts();
            setPosts(data);
        } catch (err) {
            console.error("Failed to fetch posts:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this post?')) {
            const { error } = await blogService.deletePost(id);
            if (error) {
                alert('Failed to delete post');
            } else {
                fetchPosts(); // Refresh list
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
                            <h1 className={styles.pageTitle}>Blog Management</h1>
                            <p className={styles.pageSub}>Create, edit and manage your blog articles</p>
                        </div>
                        <Link href="/admin/blog/new" className={styles.primaryBtn}>
                            + New Post
                        </Link>
                    </div>

                    <div className={styles.tableSection}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>IMAGE</th>
                                    <th>TITLE (TR / EN)</th>
                                    <th>CATEGORY</th>
                                    <th>DATE</th>
                                    <th>STATUS</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={6} style={{ textAlign: 'center' }}>Loading posts...</td></tr>
                                ) : posts.length === 0 ? (
                                    <tr><td colSpan={6} style={{ textAlign: 'center' }}>No posts found. Start by creating one!</td></tr>
                                ) : (
                                    posts.map((post) => (
                                        <tr key={post.id}>
                                            <td>
                                                <div className={styles.postThumb} style={{ backgroundImage: `url(${post.featured_image})` }}></div>
                                            </td>
                                            <td>
                                                <div className={styles.titleGroup}>
                                                    <span className={styles.trTitle}>{getI18nEntry(post.title, 'tr')}</span>
                                                    <span className={styles.enTitle}>{getI18nEntry(post.title, 'en')}</span>
                                                </div>
                                            </td>
                                            <td>{post.category}</td>
                                            <td>{new Date(post.published_at).toLocaleDateString()}</td>
                                            <td>
                                                <span className={post.is_published ? styles.badgeSuccess : styles.badgeDraft}>
                                                    {post.is_published ? 'Published' : 'Draft'}
                                                </span>
                                            </td>
                                            <td className={styles.actions}>
                                                <Link href={`/admin/blog/${post.id}`} className={styles.editBtn}>Edit</Link>
                                                <button
                                                    className={styles.deleteBtn}
                                                    onClick={() => handleDelete(post.id)}
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

export default AdminBlogPage;
