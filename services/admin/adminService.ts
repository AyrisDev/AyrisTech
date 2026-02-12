import { createClient } from '../../lib/supabase';
import { Post, Project, Service } from '../../types/database';

export const adminService = {
    // --- Posts ---
    async getAllPosts(): Promise<Post[]> {
        const supabase = createClient();
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('published_at', { ascending: false });

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.warn("Supabase fetch failed, returning mock data:", error);
            // Return mock data for demonstration
            return [
                {
                    id: 'mod1',
                    slug: 'generative-ai-strategies',
                    title: { en: 'Generative AI Strategies', tr: 'Üretken YZ Stratejileri' },
                    excerpt: { en: 'How generic AI transforms business.', tr: 'YZ iş dünyasını nasıl dönüştürüyor.' },
                    content: { en: 'Content...', tr: 'İçerik...' },
                    featured_image: '',
                    category: 'Engineering',
                    author_id: 'mock-user',
                    read_time: '5 min',
                    published_at: new Date().toISOString(),
                    is_published: true,
                    metadata: {}
                },
                {
                    id: 'mod2',
                    slug: 'blockchain-integration',
                    title: { en: 'Blockchain Integration 101', tr: 'Blok Zinciri Entegrasyonu 101' },
                    excerpt: { en: 'Understanding the blocks.', tr: 'Blokları anlamak.' },
                    content: { en: 'Content...', tr: 'İçerik...' },
                    featured_image: '',
                    category: 'Fintech',
                    author_id: 'mock-user',
                    read_time: '7 min',
                    published_at: new Date(Date.now() - 86400000).toISOString(),
                    is_published: false,
                    metadata: {}
                }
            ];
        }
    },

    async deletePost(id: string) {
        const supabase = createClient();
        const { error } = await supabase.from('posts').delete().eq('id', id);
        if (error) throw error;
    },

    // --- Projects ---
    async getAllProjects(): Promise<Project[]> {
        const supabase = createClient();
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.warn("Supabase fetch failed (Projects), returning mock data.");
            return [];
        }
    },

    async deleteProject(id: string) {
        const supabase = createClient();
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (error) throw error;
    },

    // --- Services ---
    async getAllServices(): Promise<Service[]> {
        const supabase = createClient();
        try {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .order('order_index', { ascending: true });

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.warn("Supabase fetch failed (Services), returning mock data.");
            return [];
        }
    },

    async deleteService(id: string) {
        const supabase = createClient();
        const { error } = await supabase.from('services').delete().eq('id', id);
        if (error) throw error;
    }
};
