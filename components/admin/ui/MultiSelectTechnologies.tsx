
'use client';

import { useState, useEffect } from 'react';
import { Technology } from '../../../types/database';
import { technologyService } from '../../../services/technology/technologyService';
import styles from './MultiSelectTechnologies.module.css';

interface MultiSelectTechnologiesProps {
    // We accept an array of technology NAMES (strings) to maintain compatibility with the current 'technologies' column
    // But internally we map them to IDs if possible, or just names.
    // Actually, to support the new DB structure, we should ideally deal with IDs.
    // However, the current project.technologies is string[]. 
    // Let's pass the whole array of selected Technology objects if possible, or just IDs.
    // For now, let's stick to passing Names back and forth OR IDs?
    // User wants "fetched from db". 
    // Let's make this component accept `selectedIds` and return `selectedIds`.
    selectedIds: string[];
    onChange: (ids: string[], names: string[]) => void;
}

const MultiSelectTechnologies = ({ selectedIds, onChange }: MultiSelectTechnologiesProps) => {
    const [technologies, setTechnologies] = useState<Technology[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await technologyService.getAllTechnologies();
            setTechnologies(data);
            setLoading(false);
        };
        load();
    }, []);

    const toggleTech = (tech: Technology) => {
        const isSelected = selectedIds.includes(tech.id);
        let newIds: string[];

        if (isSelected) {
            newIds = selectedIds.filter(id => id !== tech.id);
        } else {
            newIds = [...selectedIds, tech.id];
        }

        // Also calculate names for legacy support/cache
        const newNames = technologies
            .filter(t => newIds.includes(t.id))
            .map(t => t.name);

        onChange(newIds, newNames);
    };

    if (loading) return <div>Loading technologies...</div>;

    if (technologies.length === 0) {
        return <div className={styles.empty}>No technologies found. Add them in the Technologies page.</div>;
    }

    return (
        <div className={styles.container}>
            <label className={styles.label}>Technologies Used</label>
            <div className={styles.grid}>
                {technologies.map(tech => {
                    const isSelected = selectedIds.includes(tech.id);
                    return (
                        <button
                            key={tech.id}
                            type="button"
                            className={`${styles.techBtn} ${isSelected ? styles.selected : ''}`}
                            onClick={() => toggleTech(tech)}
                        >
                            {tech.icon_url && <img src={tech.icon_url} alt="" className={styles.icon} />}
                            <span className={styles.name}>{tech.name}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default MultiSelectTechnologies;
