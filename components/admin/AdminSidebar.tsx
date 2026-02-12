'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './AdminSidebar.module.css';
import { usePathname } from 'next/navigation';

const AdminSidebar = () => {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Dashboard', icon: '📊', path: '/admin' },
        { name: 'Inbox', icon: '📩', path: '/admin/contacts' },
        { name: 'Blog Posts', icon: '✍️', path: '/admin/blog' },
        { name: 'Portfolio', icon: '💼', path: '/admin/portfolio' },
        { name: 'Services', icon: '🛠️', path: '/admin/services' },

        { name: 'Contact Info', icon: '📍', path: '/admin/contact' },
        { name: 'Settings', icon: '⚙️', path: '/admin/settings' },
        { name: 'Technologies', icon: '🛠️', path: '/admin/technologies' },
    ];

    return (
        <aside className={styles.sidebar}>
            <div className={styles.brand}>
                <div className={styles.logoIcon}>
                    <Image
                        src="/logo.png"
                        alt="Ayris Tech Logo"
                        width={32}
                        height={32}
                        className={styles.logoImage}
                    />
                </div>
                <span className={styles.logoText}>Ayris Tech</span>
            </div>

            <nav className={styles.nav}>
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.path}
                        className={`${styles.navItem} ${pathname === item.path ? styles.active : ''}`}
                    >
                        <span className={styles.icon}>{item.icon}</span>
                        <span className={styles.linkText}>{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className={styles.footer}>


                <button
                    className={styles.signOutBtn}
                    onClick={async () => {
                        const { createClient } = await import('../../lib/supabase');
                        const supabase = createClient();
                        await supabase.auth.signOut();
                        window.location.href = '/admin/login';
                    }}
                >
                    <span className={styles.icon}>🚪</span>
                    <span>Sign Out</span>
                </button>

                <div className={styles.profile}>
                    <div className={styles.avatar}></div>
                    <div className={styles.profileInfo}>
                        <p className={styles.profileName}>Administrator</p>
                        <p className={styles.profileRole}>System Admin</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default AdminSidebar;
