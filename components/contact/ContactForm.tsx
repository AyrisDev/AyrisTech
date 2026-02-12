'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { createClient } from '../../lib/supabase';
import styles from './ContactForm.module.css';

const ContactForm = () => {
    const t = useTranslations('Contact.form');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const supabase = createClient();
            const { error: submitError } = await supabase
                .from('contact_submissions')
                .insert([
                    {
                        full_name: formData.full_name,
                        email: formData.email,
                        subject: formData.subject,
                        message: formData.message,
                        status: 'new',
                        created_at: new Date().toISOString()
                    }
                ]);

            if (submitError) throw submitError;

            setSuccess(true);
            setFormData({
                full_name: '',
                email: '',
                subject: '',
                message: ''
            });
        } catch (err: any) {
            console.error('Submission error:', err);
            setError(err.message || t('error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className={styles.section}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="full_name">{t('name')}</label>
                        <input
                            type="text"
                            id="full_name"
                            required
                            value={formData.full_name}
                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                            placeholder={t('placeholder.name')}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">{t('email')}</label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder={t('placeholder.email')}
                        />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="subject">{t('subject')}</label>
                    <input
                        type="text"
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder={t('placeholder.subject')}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="message">{t('message')}</label>
                    <textarea
                        id="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={t('placeholder.message')}
                    ></textarea>
                </div>

                {success && <div className={styles.successMessage}>{t('success')}</div>}
                {error && <div className={styles.errorMessage}>{error}</div>}

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? t('submitting') : (
                        <>
                            <span>{t('submit')}</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </>
                    )}
                </button>
            </form>
        </section>
    );
};

export default ContactForm;
