'use client';

import Image from 'next/image';

import { Link } from '../i18n/navigation';
import { useTranslations } from 'next-intl';
import styles from './Footer.module.css';

const Footer = () => {
    const t = useTranslations('Footer');
    const nt = useTranslations('Blog.newsletter');
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Top Section */}
                <div className={styles.top}>
                    {/* Brand Info */}
                    <div className={styles.brandInfo}>
                        <div className={styles.logo}>
                            <div className={styles.logoIcon}>
                                <Image
                                    src="/logo.png"
                                    alt="Ayris Tech Logo"
                                    width={40}
                                    height={40}
                                    className={styles.logoImage}
                                />
                            </div>

                        </div>
                        <p className={styles.tagline}>{t('tagline')}</p>
                        <div className={styles.socials}>
                            <div className={styles.socialBtn}>𝕏</div>
                            <div className={styles.socialBtn}>in</div>
                            <div className={styles.socialBtn}>ig</div>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>{t('columns.company.title')}</h4>
                        <div className={styles.columnLinks}>
                            <Link href="/" className={styles.link}>{t('columns.company.links.home')}</Link>
                            <Link href="/about" className={styles.link}>{t('columns.company.links.about')}</Link>
                            <Link href="/contact" className={styles.link}>{t('columns.company.links.contact')}</Link>
                            <Link href="/contact" className={styles.link}>{t('columns.company.links.careers')}</Link>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>{t('columns.services.title')}</h4>
                        <div className={styles.columnLinks}>
                            <Link href="/services" className={styles.link}>{t('columns.services.links.main')}</Link>
                            <Link href="/services" className={styles.link}>{t('columns.services.links.ai')}</Link>
                            <Link href="/services" className={styles.link}>{t('columns.services.links.blockchain')}</Link>
                            <Link href="/services" className={styles.link}>{t('columns.services.links.web')}</Link>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>{t('columns.resources.title')}</h4>
                        <div className={styles.columnLinks}>
                            <Link href="/blog" className={styles.link}>{t('columns.resources.links.blog')}</Link>
                            <Link href="/portfolio" className={styles.link}>{t('columns.resources.links.portfolio')}</Link>
                            <Link href="/privacy" className={styles.link}>{t('columns.resources.links.privacy')}</Link>
                        </div>
                    </div>

                    {/* Newsletter Card */}
                    <div className={styles.newsletter}>
                        <div className={styles.newsInfo}>
                            <h4 className={styles.newsTitle}>{nt('title')}</h4>
                            <p className={styles.newsDesc}>{nt('desc')}</p>
                        </div>
                        <div className={styles.newsForm}>
                            <div className={styles.inputGroup}>
                                <input
                                    type="email"
                                    placeholder={nt('input')}
                                    className={styles.input}
                                />
                                <button className={styles.submitBtn}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </button>
                            </div>
                            <p className={styles.consent}>{nt('consent')}</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={styles.bottom}>
                    <p>© {currentYear} Ayris Tech. {t('bottom.copyright')}</p>
                    <div className={styles.bottomLinks}>
                        <Link href="/privacy" className={styles.bottomLink}>{t('bottom.privacy')}</Link>
                        <Link href="/terms" className={styles.bottomLink}>{t('bottom.terms')}</Link>
                        <Link href="/cookies" className={styles.bottomLink}>{t('bottom.cookies')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
