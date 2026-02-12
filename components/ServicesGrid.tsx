import { useLocale } from 'next-intl';
import styles from './ServicesGrid.module.css';
import { Service } from '../types/database';
import { getI18nEntry } from '../utils/i18n';

interface ServicesGridProps {
    services?: Service[];
}

const ServicesGrid = ({ services = [] }: ServicesGridProps) => {
    const locale = useLocale();

    // If no services provided (or empty), we could show nothing or a message.
    // Assuming page always passes services (even if mock).

    return (
        <section className={styles.servicesGrid}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {services.map((service, index) => {
                        const title = getI18nEntry(service.title, locale);
                        const description = getI18nEntry(service.description, locale);

                        // Handle features/tags. Assuming features is list of {en,tr} or strings
                        const tags = service.features ? service.features.map(f => getI18nEntry(f, locale)) : [];

                        return (
                            <div key={service.id || index} className={styles.card}>
                                <div className={styles.iconContainer}>
                                    <span className={styles.icon}>{service.icon}</span>
                                </div>
                                <h3 className={styles.cardTitle}>{title}</h3>
                                <p className={styles.cardDescription}>{description}</p>
                                <div className={styles.divider}></div>
                                <div className={styles.tags}>
                                    {tags.map((tag, i) => (
                                        <span key={i} className={styles.tag}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ServicesGrid;
