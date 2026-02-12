import { createClient } from '../../lib/supabase';
import { Service } from '../../types/database';

export const servicesService = {
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
            console.warn("Supabase fetch failed (Services), returning mock data.", error);
            // Fallback mock data matching the static content
            return [
                {
                    id: 'mock_game',
                    slug: 'game-development',
                    title: { en: 'Game Development', tr: 'Oyun Geliştirme' },
                    description: {
                        en: 'Immersive gaming experiences built with Unity and Unreal Engine.',
                        tr: 'Unity ve Unreal Engine ile geliştirilen sürükleyici oyun deneyimleri.'
                    },
                    icon: '🎮',
                    features: [
                        { en: 'Unity & Unreal', tr: 'Unity & Unreal' },
                        { en: '3D Modeling', tr: '3D Modelleme' },
                        { en: 'Multiplayer', tr: 'Çok Oyunculu' }
                    ],
                    order_index: 1
                },
                {
                    id: 'mock_ai',
                    slug: 'artificial-intelligence',
                    title: { en: 'Artificial Intelligence', tr: 'Yapay Zeka' },
                    description: {
                        en: 'Advanced AI solutions for business automation and predictive analytics.',
                        tr: 'İş otomasyonu ve tahmine dayalı analitik için gelişmiş YZ çözümleri.'
                    },
                    icon: '🧠',
                    features: [
                        { en: 'Machine Learning', tr: 'Makine Öğrenimi' },
                        { en: 'NLP', tr: 'Doğal Dil İşleme' },
                        { en: 'Computer Vision', tr: 'Bilgisayarlı Görü' }
                    ],
                    order_index: 2
                },
                {
                    id: 'mock_blockchain',
                    slug: 'blockchain',
                    title: { en: 'Blockchain Solutions', tr: 'Blok Zinciri Çözümleri' },
                    description: {
                        en: 'Secure decentralized applications and smart contracts.',
                        tr: 'Güvenli merkeziyetsiz uygulamalar ve akıllı sözleşmeler.'
                    },
                    icon: '📦',
                    features: [
                        { en: 'Smart Contracts', tr: 'Akıllı Sözleşmeler' },
                        { en: 'DeFi', tr: 'Merkeziyetsiz Finans' },
                        { en: 'NFT Integration', tr: 'NFT Entegrasyonu' }
                    ],
                    order_index: 3
                }
            ];
        }
    }
};
