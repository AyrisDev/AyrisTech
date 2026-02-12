
'use client';

import { useState } from 'react';
import styles from './TechStackInput.module.css';

interface TechStackInputProps {
    value: string[];
    onChange: (tags: string[]) => void;
}

const TechStackInput = ({ value = [], onChange }: TechStackInputProps) => {
    const [input, setInput] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

    const addTag = () => {
        const trimmed = input.trim();
        if (trimmed && !value.includes(trimmed)) {
            onChange([...value, trimmed]);
            setInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        onChange(value.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className={styles.container}>
            <label className={styles.label}>Technologies Used</label>
            <div className={styles.inputRow}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g. React Native, Node.js, AWS"
                    className={styles.input}
                />
                <button type="button" onClick={addTag} className={styles.addBtn}>Add</button>
            </div>
            <div className={styles.tags}>
                {value.map(tag => (
                    <span key={tag} className={styles.tag}>
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className={styles.removeBtn}>×</button>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TechStackInput;
