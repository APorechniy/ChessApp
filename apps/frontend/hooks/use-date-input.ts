import { useState, useCallback } from 'react';
import { localToUtc } from '../utils/local-to-utc';

interface UseDateInputOptions {
    initialValue?: string; // UTC строка: '2025-12-22T05:00:00.000Z'
    allowNull?: boolean; // Разрешать ли пустые значения
}

export const useDateInput = (
    options?: UseDateInputOptions
) => {
    const [utcDate, setUtcDate] = useState<string | undefined>(
        options?.initialValue
    );

    // UTC → локальное время для datetime-local input
    const utcToLocalDateTime = useCallback((utcString: string | undefined): string => {
        if (!utcString) return '';

        try {
            const date = new Date(utcString);

            return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
                .toISOString()
                .slice(0, 16);
        } catch {
            return '';
        }
    }, []);

    // Локальное время → UTC
    const localToUTCDateTime = useCallback(localToUtc, [options?.allowNull]);

    // Геттер для значения input
    const getLocalValue = useCallback((): string => {
        return utcToLocalDateTime(utcDate);
    }, [utcDate, utcToLocalDateTime]);

    // Сеттер для значения input
    const setLocalValue = useCallback((localString: string) => {
        const newUtcDate = localToUTCDateTime(localString);
        setUtcDate(newUtcDate);
    }, [localToUTCDateTime]);

    // Прямая установка UTC значения
    const setUTCValue = useCallback((utcString: string | undefined) => {
        setUtcDate(utcString);
    }, []);

    // Для деструктуризации с кастомными именами
    const result = {
        // UTC значение (для отправки на бэкенд)
        utcValue: utcDate,

        // Локальное значение (для input)
        localValue: getLocalValue(),

        // Сеттеры
        setLocalValue,
        setUTCValue,

        // Валидация
        isValid: !utcDate || !isNaN(new Date(utcDate).getTime())
    };

    return [
        result.localValue,
        setLocalValue,
        {
            utcValue: result.utcValue,
            setUTCValue: result.setUTCValue,
            isValid: result.isValid
        }
    ] as const;
};