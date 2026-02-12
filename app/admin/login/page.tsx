'use client';

import { useState } from 'react';
import Image from 'next/image';
import { createClient } from '../../../lib/supabase';
import { useRouter } from 'next/navigation';
import styles from './LoginPage.module.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push('/admin');
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.loginCard}>
                <div className={styles.brand}>
                    <div className={styles.logoIcon}>
                        <Image
                            src="/logo.png"
                            alt="Ayris Tech Logo"
                            width={48}
                            height={48}
                            className={styles.logoImage}
                        />
                    </div>
                    <h1 className={styles.logoText}>Ayris Admin</h1>
                </div>

                <p className={styles.subTitle}>Access the Intelligence Hub</p>

                <form onSubmit={handleLogin} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@ayristech.com"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && <div className={styles.error}>{error}</div>}

                    <button type="submit" className={styles.loginBtn} disabled={loading}>
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
