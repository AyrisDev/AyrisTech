
import BlogHero from '../../../components/blog/BlogHero';
import BlogFilters from '../../../components/blog/BlogFilters';
import BlogGrid from '../../../components/blog/BlogGrid';
import BlogNewsletter from '../../../components/blog/BlogNewsletter';

export const metadata = {
    title: "Blog & Insights | Ayris Tech",
    description: "Exploring the intersection of engineering, design, and strategy in the digital world."
};

import { FadeIn } from '../../../components/animations/FadeIn';

import { blogService } from '../../../services/blog/blogService';

export default async function BlogPage() {
    const featuredPost = await blogService.getFeaturedPost();

    return (
        <>

            <main>
                <BlogHero post={featuredPost} />

                <FadeIn>
                    <BlogGrid />
                </FadeIn>
                <FadeIn>
                    <BlogNewsletter />
                </FadeIn>
            </main>

        </>
    );
}
