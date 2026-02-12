import styles from './PortfolioDetailTestimonial.module.css';

interface PortfolioDetailTestimonialProps {
    testimonial: any;
    locale: string;
}

const PortfolioDetailTestimonial = ({ testimonial, locale }: PortfolioDetailTestimonialProps) => {
    if (!testimonial || !testimonial.quote) return null;

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.quoteIcon}>“</div>
                    <p className={styles.quote}>
                        {testimonial.quote[locale] || testimonial.quote.en}
                    </p>

                    <div className={styles.author}>
                        <div className={styles.avatar}></div>
                        <div className={styles.info}>
                            <h4 className={styles.name}>{testimonial.author}</h4>
                            <p className={styles.role}>{testimonial.role}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PortfolioDetailTestimonial;
