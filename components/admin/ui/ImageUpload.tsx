'use client';

import { useState } from 'react';
import { createClient } from '../../../lib/supabase';
import styles from './ImageUpload.module.css';

interface ImageUploadProps {
    label: string;
    value: string;
    onUpload: (url: string) => void;
    bucket?: string;
}

const ImageUpload = ({ label, value, onUpload, bucket = 'portfolio-images' }: ImageUploadProps) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        setError(null);
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        try {
            const supabase = createClient();
            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath);

            onUpload(publicUrl);
        } catch (err: any) {
            console.error('Upload failed:', err);
            setError(err.message || 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className={styles.uploadContainer}>
            <label className={styles.uploadLabel}>{label}</label>

            <div className={styles.previewArea}>
                {value ? (
                    <div className={styles.imagePreview}>
                        <div className={styles.imgWrapper} style={{ backgroundImage: `url(${value})` }}></div>
                        <button
                            type="button"
                            className={styles.removeBtn}
                            onClick={() => onUpload('')}
                        >
                            ×
                        </button>
                    </div>
                ) : (
                    <div className={styles.placeholder}>
                        <span className={styles.icon}>📷</span>
                        <span>No image selected</span>
                    </div>
                )}
            </div>

            <div className={styles.actions}>
                <input
                    type="file"
                    id={`file-${label}`}
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className={styles.fileInput}
                />
                <label htmlFor={`file-${label}`} className={`${styles.uploadBtn} ${uploading ? styles.disabled : ''}`}>
                    {uploading ? 'Uploading...' : 'Choose Image'}
                </label>
                {error && <span className={styles.errorText}>{error}</span>}
            </div>

            {/* Hidden input to store URL but show it if needed */}
            <input type="hidden" value={value} readOnly />
        </div>
    );
};

export default ImageUpload;
