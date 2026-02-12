'use client';

import { useState } from 'react';
import { createClient } from '../../../lib/supabase';
import styles from './ImageUpload.module.css';

interface MultiImageUploadProps {
    label: string;
    values: string[];
    onUpload: (urls: string[]) => void;
    bucket?: string;
}

const MultiImageUpload = ({ label, values, onUpload, bucket = 'portfolio-images' }: MultiImageUploadProps) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        setError(null);
        const files = Array.from(e.target.files);
        const newUrls: string[] = [];

        try {
            const supabase = createClient();

            for (const file of files) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from(bucket)
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from(bucket)
                    .getPublicUrl(filePath);

                newUrls.push(publicUrl);
            }

            onUpload([...values, ...newUrls]);
        } catch (err: any) {
            console.error('Upload failed:', err);
            setError(err.message || 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (indexToRemove: number) => {
        const newValues = values.filter((_, index) => index !== indexToRemove);
        onUpload(newValues);
    };

    return (
        <div className={styles.uploadContainer}>
            <label className={styles.uploadLabel}>{label}</label>

            <div className={styles.galleryGrid}>
                {values.map((url, index) => (
                    <div key={index} className={styles.imagePreviewSquare}>
                        <div className={styles.imgWrapper} style={{ backgroundImage: `url(${url})` }}></div>
                        <button
                            type="button"
                            className={styles.removeBtn}
                            onClick={() => removeImage(index)}
                        >
                            ×
                        </button>
                    </div>
                ))}

                {/* Add Button */}
                <div className={styles.addSquare}>
                    <input
                        type="file"
                        id={`multi-file-${label}`}
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        disabled={uploading}
                        className={styles.fileInput}
                    />
                    <label htmlFor={`multi-file-${label}`} className={styles.addLabel}>
                        <span className={styles.addIcon}>{uploading ? '...' : '+'}</span>
                    </label>
                </div>
            </div>

            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};

export default MultiImageUpload;
