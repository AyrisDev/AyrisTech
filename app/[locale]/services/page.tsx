import ServicesHero from '../../../components/ServicesHero';
import ServicesGrid from '../../../components/ServicesGrid';
import ServicesPortfolioCTA from '../../../components/ServicesPortfolioCTA';
import ServicesWhyChooseUs from '../../../components/ServicesWhyChooseUs';
import { Suspense } from 'react';

import { getTranslations } from 'next-intl/server';

import { FadeIn } from '../../../components/animations/FadeIn';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'ServicesPage.metadata' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

import { servicesService } from '../../../services/services/servicesService';

async function ServicesContent() {
    const services = await servicesService.getAllServices();
    return <ServicesGrid services={services} />;
}

export default async function ServicesPage() {
    return (
        <>
            <main>
                <ServicesHero />
                <FadeIn delay={0.2}>
                    <Suspense fallback={<div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading services...</div>}>
                        <ServicesContent />
                    </Suspense>
                </FadeIn>
                <FadeIn>
                    <ServicesPortfolioCTA />
                </FadeIn>
                <FadeIn>
                    <ServicesWhyChooseUs />
                </FadeIn>
            </main>
        </>
    );
}
