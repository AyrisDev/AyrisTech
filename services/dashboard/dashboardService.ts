
import { createClient } from '../../lib/supabase';

export const dashboardService = {
    async getStats(): Promise<{
        totalProjects: number;
        totalPosts: number;
        // unreadMessages: number; // We don't have a messages table yet?
    }> {
        const supabase = createClient();

        // Count Projects
        const { count: projectCount, error: projectError } = await supabase
            .from('projects')
            .select('*', { count: 'exact', head: true });

        // Count Posts
        const { count: postCount, error: postError } = await supabase
            .from('posts')
            .select('*', { count: 'exact', head: true });

        return {
            totalProjects: projectCount || 0,
            totalPosts: postCount || 0,
            // unreadMessages: 0
        };
    }
};
