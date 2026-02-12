'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '../../../../components/admin/AdminSidebar';
import AdminHeader from '../../../../components/admin/AdminHeader';
import PortfolioEditor from '../../../../components/admin/PortfolioEditor';
import { portfolioService } from '../../../../services/portfolio/portfolioService';
import { useRouter, useParams } from 'next/navigation';
import { Project } from '../../../../types/database';
import styles from '../../blog/new/AdminEditor.module.css';

const EditProjectPage = () => {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            if (!id) return;
            const data = await portfolioService.getProjectById(id);
            setProject(data);
            setLoading(false);
        };
        fetchProject();
    }, [id]);

    const handleSave = async (formData: any) => {
        const visualsArray = formData.visuals;

        // Format stats for DB
        const formattedStats = formData.impact_stats.map((s: any) => ({
            label: { en: s.label_en, tr: s.label_tr },
            value: s.value
        }));

        // Format testimonial
        const testimonial = {
            quote: { en: formData.testimonial_quote_en, tr: formData.testimonial_quote_tr },
            author: formData.testimonial_author,
            role: formData.testimonial_role
        };

        const { error } = await portfolioService.updateProject(id, {
            slug: formData.slug || formData.title_en.toLowerCase().replace(/ /g, '-'),
            category: formData.category,
            year: formData.year,
            client: formData.client,
            website_url: formData.website_url,
            main_image: formData.main_image,
            is_featured: formData.is_featured,

            title: { tr: formData.title_tr, en: formData.title_en },
            description: { tr: formData.desc_tr, en: formData.desc_en },
            role: { tr: formData.role_tr, en: formData.role_en },
            sector: { tr: formData.sector_tr, en: formData.sector_en },
            overview: { tr: formData.overview_tr, en: formData.overview_en },
            challenge: { tr: formData.challenge_tr, en: formData.challenge_en },
            solution: { tr: formData.solution_tr, en: formData.solution_en },

            visuals: visualsArray,
            technologies: formData.technologies,
            technology_ids: formData.technology_ids,
            impact_stats: formattedStats,
            testimonial: testimonial,
        });

        console.log('Update result:', { error }); // Debug log

        if (error) {
            console.error('Update failed:', error);
            alert(error.message);
            throw error;
        } else {
            console.log('Update successful, redirecting...');
            router.push('/admin/portfolio');
        }
    };

    if (loading) {
        return <div style={{ color: 'white', padding: '2rem' }}>Loading project...</div>;
    }

    if (!project) {
        return <div style={{ color: 'white', padding: '2rem' }}>Project not found</div>;
    }

    return (
        <div className={styles.adminWrapper}>
            <AdminSidebar />
            <main className={styles.mainContent}>
                <AdminHeader />
                <div className={styles.container}>
                    <PortfolioEditor initialData={project} onSave={handleSave} />
                </div>
            </main>
        </div>
    );
};

export default EditProjectPage;
