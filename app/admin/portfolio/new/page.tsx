'use client';

import AdminSidebar from '../../../../components/admin/AdminSidebar';
import AdminHeader from '../../../../components/admin/AdminHeader';
import PortfolioEditor from '../../../../components/admin/PortfolioEditor';
import { portfolioService } from '../../../../services/portfolio/portfolioService';
import { useRouter } from 'next/navigation';
import styles from '../../blog/new/AdminEditor.module.css';

const NewProjectPage = () => {
    const router = useRouter();

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

        const { error } = await portfolioService.createProject({
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
            impact_stats: formattedStats,
            testimonial: testimonial,
            technologies: formData.technologies,
            technology_ids: formData.technology_ids,

            created_at: new Date().toISOString()
        });

        if (error) {
            alert(error.message);
            throw error;
        } else {
            router.push('/admin/portfolio');
        }
    };

    return (
        <div className={styles.adminWrapper}>
            <AdminSidebar />
            <main className={styles.mainContent}>
                <AdminHeader />
                <div className={styles.container}>
                    <PortfolioEditor onSave={handleSave} />
                </div>
            </main>
        </div>
    );
};

export default NewProjectPage;
