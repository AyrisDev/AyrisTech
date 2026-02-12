
import AboutHero from '../../../components/about/AboutHero';
import AboutStats from '../../../components/about/AboutStats';
import AboutPurpose from '../../../components/about/AboutPurpose';
import AboutValues from '../../../components/about/AboutValues';
import AboutTeam from '../../../components/about/AboutTeam';
import AboutCTA from '../../../components/about/AboutCTA';

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'About.hero' });

    return {
        title: `${t('title')} | Ayris Tech`,
        description: t('desc')
    };
}


import { FadeIn } from '../../../components/animations/FadeIn';

export default function AboutPage() {
    return (
        <>

            <main>
                <AboutHero />
                <FadeIn delay={0.2}>
                    <AboutStats />
                </FadeIn>
                <FadeIn>
                    <AboutPurpose />
                </FadeIn>
                <FadeIn>
                    <AboutValues />
                </FadeIn>
                {/*
                <FadeIn>
                    <AboutTeam />
                </FadeIn>  */}
                <FadeIn>
                    <AboutCTA />
                </FadeIn>
            </main>
        </>
    );
}
