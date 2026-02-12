
import { createClient } from '../../lib/supabase';
import { ContactInfo } from '../../types/database';

export const contactService = {
    async getContactInfo(): Promise<ContactInfo | null> {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('contact_info')
            .select('*')
            .single();

        if (error) {
            console.error('Error fetching contact info:', error);
            // Fallback for development if table not migrated yet
            return null;
        }

        return data;
    },

    async updateContactInfo(id: string, info: Partial<ContactInfo>): Promise<{ data: ContactInfo | null; error: any }> {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('contact_info')
            .update(info)
            .eq('id', id)
            .select()
            .single();

        return { data, error };
    }
};
