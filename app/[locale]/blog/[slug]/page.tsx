import BlogDetailHeader from '../../../../components/blog/BlogDetail/BlogDetailHeader';
import BlogDetailContent from '../../../../components/blog/BlogDetail/BlogDetailContent';
import BlogDetailRelated from '../../../../components/blog/BlogDetail/BlogDetailRelated';
import BlogDetailDiscussion from '../../../../components/blog/BlogDetail/BlogDetailDiscussion';
import { blogService } from '../../../../services/blog/blogService';
import { getI18nEntry } from '../../../../utils/i18n';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }) {
    const { slug, locale } = await params;
    const post = await blogService.getPostBySlug(slug);
    console.log(post);
    if (!post) return {};

    return {
        title: `${getI18nEntry(post.title, locale)} | Ayris Tech`,
        description: getI18nEntry(post.excerpt, locale),
    };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
    const { slug, locale } = await params;
    const post = await blogService.getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // Format date
    const date = new Date(post.published_at || post.created_at || new Date()).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <>
            <main>
                <BlogDetailHeader
                    title={getI18nEntry(post.title, locale)}
                    category={post.category || 'Tech'}
                    date={date}
                    readTime={post.read_time || '5 min read'}
                    commentsCount={0}
                    featuredImage={post.featured_image}
                />
                <BlogDetailContent content={post.content} tags={post.tags || post.metadata} />
                <BlogDetailRelated currentId={post.id} />
                {/* <BlogDetailDiscussion /> */}
            </main>
        </>
    );
}
