import Hero from '../../components/Hero';
import TechTicker from '../../components/TechTicker';
import Services from '../../components/Services';
import Engineering from '../../components/Engineering';
import Testimonial from '../../components/Testimonial';
import CTA from '../../components/CTA';
import { FadeIn } from '../../components/animations/FadeIn';


export const revalidate = 3600; // Cache the homepage for 1 hour

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <FadeIn delay={0.2}>
          <TechTicker />
        </FadeIn>
        <FadeIn>
          <Services />
        </FadeIn>
        <FadeIn>
          <Engineering />
        </FadeIn>
        {/* 
        <FadeIn>
          <Testimonial />
        </FadeIn> */}
        <FadeIn>
          <CTA />
        </FadeIn>
      </main>
    </>
  );
}

