
import { createClient } from '../../lib/supabase';
import { Technology } from '../../types/database';

export const technologyService = {
    async getAllTechnologies(): Promise<Technology[]> {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('technologies')
            .select('*')
            .order('name', { ascending: true });

        if (error) {
            console.error('Error fetching technologies:', error);
            return [];
        }

        return data || [];
    },

    async createTechnology(technology: Partial<Technology>): Promise<{ data: Technology | null, error: any }> {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('technologies')
            .insert([technology])
            .select()
            .single();

        return { data, error };
    },

    async deleteTechnology(id: string): Promise<{ error: any }> {
        const supabase = createClient();
        const { error } = await supabase
            .from('technologies')
            .delete()
            .eq('id', id);

        return { error };
    }
};
