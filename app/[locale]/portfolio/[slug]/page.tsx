
import PortfolioDetailHero from '../../../../components/portfolio/PortfolioDetail/PortfolioDetailHero';
import PortfolioDetailOverview from '../../../../components/portfolio/PortfolioDetail/PortfolioDetailOverview';
import PortfolioDetailChallenge from '../../../../components/portfolio/PortfolioDetail/PortfolioDetailChallenge';
import PortfolioDetailVisuals from '../../../../components/portfolio/PortfolioDetail/PortfolioDetailVisuals';
import PortfolioDetailStats from '../../../../components/portfolio/PortfolioDetail/PortfolioDetailStats';
import PortfolioDetailTestimonial from '../../../../components/portfolio/PortfolioDetail/PortfolioDetailTestimonial';
import PortfolioDetailFooter from '../../../../components/portfolio/PortfolioDetail/PortfolioDetailFooter';

import PortfolioSidebar from '../../../../components/portfolio/PortfolioDetail/PortfolioSidebar';
import PortfolioDetailTechStack from '../../../../components/portfolio/PortfolioDetail/PortfolioDetailTechStack';
import styles from './PortfolioDetail.module.css';

import { portfolioService } from '../../../../services/portfolio/portfolioService';
import { getI18nEntry } from '../../../../utils/i18n';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }) {
    const { slug, locale } = await params;
    const project = await portfolioService.getProjectBySlug(slug);

    if (!project) return {};

    return {
        title: `${getI18nEntry(project.title, locale)} | Ayris Tech`,
        description: getI18nEntry(project.description, locale),
    };
}

import { FadeIn } from '../../../../components/animations/FadeIn';

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
    const { slug, locale } = await params;

    const project = await portfolioService.getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    const nextProject = await portfolioService.getNextProject(project.id);

    return (
        <>

            <main>
                <PortfolioDetailHero
                    title={getI18nEntry(project.title, locale)}
                    category={project.category}
                    client={project.client}
                    role={getI18nEntry(project.role, locale)}
                    sector={getI18nEntry(project.sector, locale)}
                    year={project.year}
                    coverImage={project.main_image}
                    websiteUrl={project.website_url}
                />
                <div className={styles.pageGrid}>
                    <div className={styles.sidebarColumn}>
                        <FadeIn delay={0.2} direction="right">
                            <PortfolioSidebar />
                        </FadeIn>
                    </div>
                    <div className={styles.contentColumn}>
                        <FadeIn>
                            <PortfolioDetailOverview
                                overview={project.overview}
                                image={project.main_image}
                                locale={locale}
                            />
                        </FadeIn>
                        <FadeIn>
                            <PortfolioDetailChallenge
                                challenge={project.challenge}
                                solution={project.solution}
                                locale={locale}
                            />
                        </FadeIn>
                        <FadeIn>
                            <PortfolioDetailVisuals
                                visuals={project.visuals}
                            />
                        </FadeIn>
                        <FadeIn>
                            <PortfolioDetailTechStack
                                technologies={project.technologies}
                                technologies_data={project.technologies_data}
                            />
                        </FadeIn>
                    </div>
                </div>

                <FadeIn>
                    <PortfolioDetailFooter nextProject={nextProject} />
                </FadeIn>
            </main>

        </>
    );
}
