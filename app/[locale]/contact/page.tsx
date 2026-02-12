
import ContactForm from '../../../components/contact/ContactForm';
import { getTranslations } from 'next-intl/server';
import { FadeIn } from '../../../components/animations/FadeIn';
import styles from './ContactPage.module.css';
import { contactService } from '../../../services/contact/contactService';
import { getI18nEntry } from '../../../utils/i18n';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Contact' });

    return {
        title: `${t('title')} | Ayris Tech`,
        description: t('description'),
    };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations('Contact');
    const contactInfo = await contactService.getContactInfo();

    // Fallbacks
    const email = contactInfo?.email || 'hello@ayristech.com';
    const phone = contactInfo?.phone || '+90 (212) 555 0123';
    const address = contactInfo?.address ? getI18nEntry(contactInfo.address, locale) : 'Levent, Istanbul / Turkey';
    const hours = contactInfo?.hours ? getI18nEntry(contactInfo.hours, locale) : 'Mon - Fri: 09:00 - 18:00';

    const socials = contactInfo?.social_links || {};

    return (
        <>

            <main className={styles.main}>
                {/* Background Decorative Elements */}
                <div className={styles.bgGlow}></div>

                <div className={styles.container}>
                    <div className={styles.contentGrid}>
                        <FadeIn className={styles.infoSection} direction="left">
                            <h1 className={styles.title}>{t('title')}</h1>
                            <p className={styles.description}>{t('description')}</p>

                            <div className={styles.infoGrid}>
                                <div className={styles.infoItem}>
                                    <div className={styles.infoIcon}>✉️</div>
                                    <div>
                                        <h4 className={styles.infoLabel}>{t('info.email')}</h4>
                                        <p className={styles.infoValue}>{email}</p>
                                    </div>
                                </div>
                                <div className={styles.infoItem}>
                                    <div className={styles.infoIcon}>📞</div>
                                    <div>
                                        <h4 className={styles.infoLabel}>{t('info.phone')}</h4>
                                        <p className={styles.infoValue}>{phone}</p>
                                    </div>
                                </div>
                                <div className={styles.infoItem}>
                                    <div className={styles.infoIcon}>📍</div>
                                    <div>
                                        <h4 className={styles.infoLabel}>{t('info.address')}</h4>
                                        <p className={styles.infoValue}>{address}</p>
                                    </div>
                                </div>
                                <div className={styles.infoItem}>
                                    <div className={styles.infoIcon}>🕒</div>
                                    <div>
                                        <h4 className={styles.infoLabel}>{t('info.hours')}</h4>
                                        <p className={styles.infoValue}>{hours}</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.socials}>
                                {socials.twitter && (
                                    <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>𝕏</a>
                                )}
                                {socials.linkedin && (
                                    <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>in</a>
                                )}
                                {socials.instagram && (
                                    <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>ig</a>
                                )}
                                {!socials.twitter && !socials.linkedin && !socials.instagram && (
                                    <>
                                        {/* Fallback rendering if no dynamic socials */}
                                        <div className={styles.socialBtn}>𝕏</div>
                                        <div className={styles.socialBtn}>in</div>
                                        <div className={styles.socialBtn}>ig</div>
                                    </>
                                )}
                            </div>
                        </FadeIn>

                        <FadeIn className={styles.formSection} delay={0.2} direction="right">
                            <div className={styles.formCard}>
                                <ContactForm />
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </main>

        </>
    );
}
