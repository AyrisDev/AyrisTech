'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './PortfolioDetailVisuals.module.css';

interface PortfolioDetailVisualsProps {
    visuals: string[];
}

const PortfolioDetailVisuals = ({ visuals }: PortfolioDetailVisualsProps) => {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    // Close lightbox on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;

            if (e.key === 'Escape') setLightboxIndex(null);
            if (e.key === 'ArrowLeft') navigate(-1);
            if (e.key === 'ArrowRight') navigate(1);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex]);

    if (!visuals || visuals.length === 0) return null;

    const navigate = (direction: number) => {
        if (lightboxIndex === null) return;

        let newIndex = lightboxIndex + direction;
        // Loop around
        if (newIndex < 0) newIndex = visuals.length - 1;
        if (newIndex >= visuals.length) newIndex = 0;

        setLightboxIndex(newIndex);
    };

    return (
        <>
            <section className={styles.section} id="visuals">
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>Visual Experience</h2>
                        <p className={styles.description}>
                            A closer look at the design details and user interface elements.
                        </p>
                    </div>

                    <div className={styles.grid}>
                        {visuals.map((img, i) => (
                            <div
                                key={i}
                                className={styles.gridItem}
                                onClick={() => setLightboxIndex(i)}
                            >
                                <img
                                    src={img}
                                    alt={`Project Visual ${i + 1}`}
                                    loading={i < 2 ? "eager" : "lazy"}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox Overlay */}
            <div className={`${styles.lightbox} ${lightboxIndex !== null ? styles.active : ''}`}>
                {lightboxIndex !== null && (
                    <>
                        <button className={styles.closeBtn} onClick={() => setLightboxIndex(null)}>
                            ✕
                        </button>

                        <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={(e) => { e.stopPropagation(); navigate(-1); }}>
                            ←
                        </button>

                        <div className={styles.lightboxContent} onClick={() => setLightboxIndex(null)}>
                            <img
                                src={visuals[lightboxIndex]}
                                alt={`Full screen visual ${lightboxIndex + 1}`}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>

                        <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={(e) => { e.stopPropagation(); navigate(1); }}>
                            →
                        </button>
                    </>
                )}
            </div>
        </>
    );
};

export default PortfolioDetailVisuals;


