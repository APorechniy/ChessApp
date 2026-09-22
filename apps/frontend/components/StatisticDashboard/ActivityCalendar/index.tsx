import React, { useMemo } from 'react';
import * as S from './styled';

interface ActivityCalendarProps {
    activeDays?: number[]; // Массив номеров дней занятий, например [1, 5, 10, 14]
}

export const ActivityCalendar: React.FC<ActivityCalendarProps> = ({
    activeDays = [1, 5, 10], // По умолчанию
}) => {
    const { currentDay, monthName, daysArray } = useMemo(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const currentDay = now.getDate(); // Номер сегодняшнего дня

        // Расчет количества дней именно в текущем месяце (28, 29, 30 или 31)
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Массив чисел от 1 до daysInMonth
        const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

        // Локализованное название месяца и года (например, "Март 2025")
        const monthName = new Intl.DateTimeFormat('ru-RU', {
            month: 'long',
            year: 'numeric',
        }).format(now);

        return { currentDay, monthName, daysArray };
    }, []);

    // Используем Set для O(1) быстрого поиска совпадений
    const activeDaysSet = useMemo(() => new Set(activeDays), [activeDays]);

    return (
        <S.Card>
            <S.HeaderRow>
                <S.Title>Календарь активности</S.Title>
                <S.MonthLabel>{monthName}</S.MonthLabel>
            </S.HeaderRow>

            <S.Grid>
                {daysArray.map((day) => {
                    const isActive = activeDaysSet.has(day);
                    const isToday = day === currentDay;
                    const isFuture = day > currentDay;

                    return (
                        <S.DaySquare
                            key={day}
                            $isActive={isActive}
                            $isToday={isToday}
                            $isFuture={isFuture}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.15, delay: day * 0.008 }}
                            whileHover={{ scale: isFuture ? 1 : 1.15 }}
                        >
                            {day}
                        </S.DaySquare>
                    );
                })}
            </S.Grid>

            {/* Поясняющие легенды */}
            <S.LegendRow>
                <S.LegendItem>
                    <S.LegendDot $bgColor="#646cff" /> Был на уроке
                </S.LegendItem>
                <S.LegendItem>
                    <S.LegendDot
                        $bgColor="transparent"
                        $border="1.5px solid rgba(255, 159, 36, 1)"
                    />{' '}
                    Сегодня
                </S.LegendItem>
                <S.LegendItem>
                    <S.LegendDot $bgColor="rgba(0,0,0,0.03)" $border="1px dashed #ccc" /> Будущие
                </S.LegendItem>
            </S.LegendRow>
        </S.Card>
    );
};