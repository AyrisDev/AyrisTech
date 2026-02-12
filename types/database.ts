export interface I18nText {
    en: string;
    tr: string;
    [key: string]: string;
}

export interface Post {
    id: string;
    slug: string;
    title: I18nText | string;
    excerpt: I18nText | string;
    content: I18nText | string;
    featured_image: string;
    category: string;
    author_id?: string;
    read_time: string;
    published_at: string;
    is_published: boolean;
    metadata?: any;
    tags?: I18nText | string; // Comma separated tag strings
    created_at?: string;
    updated_at?: string;
}

export interface Project {
    id: string;
    slug: string;
    title: I18nText | string;
    description: I18nText | string;
    main_image: string;
    category: string;
    client: string;
    role: I18nText | string;
    sector: I18nText | string;
    year: string;
    overview: I18nText | string;
    challenge: I18nText | string;
    solution: I18nText | string;
    visuals: string[];
    impact_stats: any[];
    testimonial: any;
    technologies?: string[];
    technologies_data?: Technology[]; // Joined relations
    website_url?: string;
    is_featured: boolean;
    created_at?: string;
}

export interface Service {
    id: string;
    slug: string;
    title: I18nText | string;
    description: I18nText | string;
    icon: string;
    features: any[];
    order_index: number;
    created_at?: string;
}

export interface Category {
    id: string;
    slug: string;
    name_en: string;
    name_tr: string;
    created_at?: string;
}

export interface Technology {
    id: string;
    name: string;
    icon_url: string;
    created_at?: string;
}

export interface ContactInfo {
    id: string;
    email: string;
    phone: string;
    address: I18nText | string;
    hours: I18nText | string;
    social_links: {
        twitter?: string;
        linkedin?: string;
        instagram?: string;
        github?: string;
        [key: string]: string | undefined;
    };
    created_at?: string;
    updated_at?: string;
}
