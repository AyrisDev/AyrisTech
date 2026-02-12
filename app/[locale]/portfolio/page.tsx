
import PortfolioHero from '../../../components/PortfolioHero';
import PortfolioStats from '../../../components/PortfolioStats';
import PortfolioGrid from '../../../components/PortfolioGrid';
import PortfolioCTA from '../../../components/PortfolioCTA';


import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'PortfolioPage' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default function PortfolioPage() {
    return (
        <>

            <main>
                <PortfolioHero />
                {/* <PortfolioStats /> */}
                <PortfolioGrid />
                <PortfolioCTA />
            </main>

        </>
    );
}
