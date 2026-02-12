
import { createClient } from '../../lib/supabase';
import { Post } from '../../types/database';

export const blogService = {
    async getPublishedPosts(): Promise<Post[]> {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('is_published', true)
            .order('published_at', { ascending: false });

        if (error) {
            console.error('Error fetching published posts:', error);
            return [];
        }

        return data || [];
    },

    async getFeaturedPost(): Promise<Post | null> {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('is_published', true)
            .order('published_at', { ascending: false })
            .limit(1)
            .single();

        if (error) {
            // console.error('Error fetching featured post:', error);
            return null;
        }

        return data;
    },

    async getAllPosts(): Promise<Post[]> {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching all posts:', error);
            return [];
        }
        return data || [];
    },

    async getPostBySlug(slug: string): Promise<Post | null> {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) {
            console.error('Error fetching post by slug:', error);
            return null;
        }

        return data;
    },

    async getPostById(id: string): Promise<Post | null> {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching post by id:', error);
            return null;
        }

        return data;
    },

    async createPost(post: Partial<Post>): Promise<{ data: Post | null; error: any }> {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('posts')
            .insert([post])
            .select()
            .single();

        return { data, error };
    },

    async updatePost(id: string, post: Partial<Post>): Promise<{ data: Post | null; error: any }> {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('posts')
            .update(post)
            .eq('id', id)
            .select()
            .single();

        return { data, error };
    },

    async deletePost(id: string): Promise<{ error: any }> {
        const supabase = createClient();
        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', id);

        return { error };
    },

    async getRandomPosts(count: number, excludeId?: string): Promise<Post[]> {
        const supabase = createClient();
        // Fetch more than needed to ensure randomness
        let query = supabase
            .from('posts')
            .select('*')
            .eq('is_published', true);

        if (excludeId) {
            query = query.neq('id', excludeId);
        }

        const { data, error } = await query.limit(20);

        if (error || !data) return [];

        // Shuffle array
        const shuffled = data.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
};
