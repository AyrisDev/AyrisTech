import { createClient } from '../../lib/supabase';
import { Project } from '../../types/database';
import { categoryService } from '../category/categoryService';

export const portfolioService = {
    async getFeaturedProjects(): Promise<Project[]> {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('is_featured', true)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching featured projects:', error);
            return [];
        }

        return data || [];
    },

    async getAllProjects(): Promise<Project[]> {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching all projects:', error);
            return [];
        }

        return data || [];
    },

    async getProjectBySlug(slug: string): Promise<Project | null> {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('projects')
            .select(`
                *,
                project_technologies (
                    technology:technologies (*)
                )
            `)
            .eq('slug', slug)
            .single();

        if (error) {
            console.error('Error fetching project by slug:', error);
            return null;
        }

        // Transform nested tech data
        const transformed = {
            ...data,
            technologies_data: data.project_technologies?.map((pt: any) => pt.technology) || []
        };

        return transformed;
    },
    async getProjectById(id: string): Promise<Project | null> {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('projects')
            .select(`
                *,
                project_technologies (
                    technology:technologies (*)
                )
            `)
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching project by id:', error);
            return null;
        }

        // Transform nested tech data
        const transformed = {
            ...data,
            technologies_data: data.project_technologies?.map((pt: any) => pt.technology) || []
        };

        return transformed;
    },

    async createProject(project: Partial<Project> & { technology_ids?: string[] }): Promise<{ data: Project | null; error: any }> {
        const supabase = createClient();
        const { technology_ids, ...projectData } = project;

        // 1. Create Project
        const { data, error } = await supabase
            .from('projects')
            .insert([projectData])
            .select()
            .single();

        if (error || !data) return { data: null, error };

        // 2. Insert Technology Relations
        if (technology_ids && technology_ids.length > 0) {
            const relations = technology_ids.map(techId => ({
                project_id: data.id,
                technology_id: techId
            }));

            const { error: techError } = await supabase
                .from('project_technologies')
                .insert(relations);

            if (techError) console.error('Error linking technologies:', techError);
        }

        return { data, error };
    },

    async updateProject(id: string, project: Partial<Project> & { technology_ids?: string[] }): Promise<{ data: Project | null; error: any }> {
        const supabase = createClient();
        const { technology_ids, ...projectData } = project;

        // 1. Update Project Fields
        const { data, error } = await supabase
            .from('projects')
            .update(projectData)
            .eq('id', id)
            .select()
            .single();

        if (error) return { data: null, error };

        // 2. Update Relations (Delete All + Insert New)
        if (technology_ids !== undefined) {
            // Delete existing
            await supabase
                .from('project_technologies')
                .delete()
                .eq('project_id', id);

            // Insert new
            if (technology_ids.length > 0) {
                const relations = technology_ids.map(techId => ({
                    project_id: id,
                    technology_id: techId
                }));

                const { error: techError } = await supabase
                    .from('project_technologies')
                    .insert(relations);

                if (techError) console.error('Error updating technology relations:', techError);
            }
        }

        return { data, error };
    },

    async deleteProject(id: string): Promise<{ error: any }> {
        const supabase = createClient();
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);

        return { error };
    },

    async getCategories(): Promise<string[]> {
        // Deprecated: prefer using categoryService directly
        const categories = await categoryService.getAllCategories();
        return categories.map(c => c.slug);
    },

    async getNextProject(currentId: string): Promise<Project | null> {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false }); // Newest first

        if (error || !data || data.length === 0) return null;

        const currentIndex = data.findIndex(p => p.id === currentId);
        if (currentIndex === -1) return data[0]; // Fallback to first

        // Get next project (moving backwards in time if we sort desc)
        // Or if user wants "Next" as in "Older", or "Next" as in "Newer"?
        // Usually "Next Project" implies just another one.
        // Let's do circular.
        const nextIndex = (currentIndex + 1) % data.length;
        return data[nextIndex];
    }
};
