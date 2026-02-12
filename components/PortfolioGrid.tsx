'use client';

import { motion, AnimatePresence } from 'framer-motion';

import { useState, useEffect } from 'react';
import styles from './PortfolioGrid.module.css';
import { Link } from '../i18n/navigation';
import { portfolioService } from '../services/portfolio/portfolioService';
import { categoryService } from '../services/category/categoryService';
import { Project, Category } from '../types/database';
import { useLocale, useTranslations } from 'next-intl';
import { getI18nEntry } from '../utils/i18n';

const PortfolioGrid = () => {
    const t = useTranslations('PortfolioGrid');
    const locale = useLocale();
    const [projects, setProjects] = useState<Project[]>([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const [projectsData, categoriesData] = await Promise.all([
                portfolioService.getAllProjects(),
                categoryService.getAllCategories()
            ]);
            setProjects(projectsData);
            setCategories(categoriesData);
            setLoading(false);

        };
        fetchData();
    }, []);

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(p => p.category === activeFilter);

    console.log(filteredProjects)
    if (loading) return <div className={styles.loading}>Loading projects...</div>;

    const getCategoryName = (slug: string) => {
        const cat = categories.find(c => c.slug === slug);
        if (!cat) return slug; // Fallback to slug/string if not found
        return locale === 'tr' ? cat.name_tr : cat.name_en;
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.titleGroup}>
                        <span className={styles.sectionBadge}>{t('badge')}</span>
                        <h2 className={styles.title}>{t('title')} <span>{t('titleHighlight')}</span></h2>
                    </div>

                    <div className={styles.filters}>
                        <button
                            className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.active : ''}`}
                            onClick={() => setActiveFilter('all')}
                        >
                            {t('filters.all')}
                        </button>
                        {categories.map(category => (
                            <button
                                key={category.id}
                                className={`${styles.filterBtn} ${activeFilter === category.slug ? styles.active : ''}`}
                                onClick={() => setActiveFilter(category.slug)}
                            >
                                {locale === 'tr' ? category.name_tr : category.name_en}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    layout
                    className={styles.grid}
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map(project => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Link
                                    href={`/portfolio/${project.slug}`}
                                    className={`${styles.card} ${styles.medium}`}
                                >
                                    <div className={styles.cardImageWrapper}>
                                        <div className={styles.cardImage} style={project.main_image ? { backgroundImage: `url(${project.main_image})` } : {}}>
                                            {project.is_featured && (
                                                <div className={styles.featuredBadge}>
                                                    FEATURED
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className={styles.cardBody}>
                                        <h3 className={styles.projectTitle}>{getI18nEntry(project.title, locale)}</h3>

                                        <div className={styles.tags}>
                                            <span className={styles.tagBadge}>
                                                {getCategoryName(project.category)}
                                            </span>
                                        </div>

                                        <p className={styles.projectDescription}>{getI18nEntry(project.description, locale)}</p>

                                        <div className={styles.cardFooter}>
                                            <span className={styles.caseId}>CASE ID: #{String(project.id).padStart(4, '0')}</span>
                                            <span className={styles.arrowIcon}>→</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section >
    );
};

export default PortfolioGrid;
