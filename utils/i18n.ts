/**
 * Extracts translated text from a JSONB object based on the current locale.
 * Fallback priority: Current Locale -> English -> Any Available -> Empty String
 */
export const getI18nEntry = (data: any, locale: string): string => {
    if (!data) return '';

    if (typeof data === 'string') return data;

    const entry = data[locale] || data['en'];

    if (entry) return entry;

    // If fallback to English is not available, take the first available key
    const firstKey = Object.keys(data)[0];
    if (firstKey) return data[firstKey];

    return '';
};
