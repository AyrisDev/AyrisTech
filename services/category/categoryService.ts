import { createClient } from '../../lib/supabase';
import { Category } from '../../types/database';

export const categoryService = {
    async getAllCategories(): Promise<Category[]> {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name_en', { ascending: true });

        if (error) {
            console.error('Error fetching categories:', error);
            return [];
        }

        return data || [];
    },

    async getCategoryById(id: string): Promise<Category | null> {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching category:', error);
            return null;
        }

        return data;
    },

    async createCategory(category: Partial<Category>): Promise<{ error: any }> {
        const supabase = createClient();
        const { error } = await supabase
            .from('categories')
            .insert([category]);

        return { error };
    },

    async updateCategory(id: string, category: Partial<Category>): Promise<{ error: any }> {
        const supabase = createClient();
        const { error } = await supabase
            .from('categories')
            .update(category)
            .eq('id', id);

        return { error };
    },

    async deleteCategory(id: string): Promise<{ error: any }> {
        const supabase = createClient();
        const { error } = await supabase
            .from('categories')
            .delete()
            .eq('id', id);

        return { error };
    }
};
