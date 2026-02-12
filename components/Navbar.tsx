'use client';

import Image from 'next/image';

import { useState, useEffect } from 'react';
import { Link, usePathname, useRouter } from '../i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import styles from './Navbar.module.css';


const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('services'), path: '/services' },
    { name: t('portfolio'), path: '/portfolio' },
    { name: t('blog'), path: '/blog' },
    { name: t('about'), path: '/about' },
    { name: t('contact'), path: '/contact' },
  ];

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'tr' : 'en';
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <Image
              src="/logo.png"
              alt="AyrisTech Logo"
              width={40}
              height={40}
              className={styles.logoImage}
            />
          </div>


        </Link>

        {/* Desktop Navigation */}
        <div className={styles.links}>
          {navLinks.map((link) => {
            const isActive = pathname === link.path;

            return (
              <Link
                key={link.path}
                href={link.path}
                className={`${styles.link} ${isActive ? styles.active : ''}`}
              >
                {link.name}
                {isActive && <span className={styles.activeDot}></span>}
              </Link>
            );
          })}
        </div>

        {/* Search & Actions */}
        <div className={styles.actions}>


          <button onClick={toggleLanguage} className={styles.langSwitch}>
            {locale.toUpperCase()}
          </button>

          <Link href="/contact" className={styles.ctaButton}>
            {t('cta')}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className={`${styles.mobileToggle} ${isMobileMenuOpen ? styles.open : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.show : ''}`}>
        <div className={styles.mobileLinks}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={styles.mobileLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <button onClick={toggleLanguage} className={styles.mobileLangBtn}>
            Language: {locale === 'en' ? 'English' : 'Türkçe'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
