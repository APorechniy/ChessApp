import React from 'react';
import * as S from './styled';
import { type StudentStatistic } from '../../../store/students/types';

interface StatCardsProps {
    stats: StudentStatistic;
}

export const StatCards: React.FC<StatCardsProps> = ({ stats }) => {
    const cards = [
        {
            title: 'Посещено занятий',
            value: `${stats.lessons.visited}`,
            sub: ``,
            color: '#646cff',
        },
        {
            title: 'Пройдено тем',
            value: `${stats.topics.learned}`,
            sub: ``,
            color: '#21BDCA',
        },
        {
            title: 'Решено задач',
            value: `${stats.tasksSolvedCount}`,
            sub: '',
            color: 'rgba(255, 159, 36, 1)',
        },
        {
            title: 'Дней активности',
            value: `${stats.activeDaysLastMonth.length} дней`,
            sub: 'За последний месяц',
            color: '#646cff',
        },
    ];

    return (
        <S.CardsGrid>
            {cards.map((card, idx) => (
                <S.Card
                    key={card.title}
                    $color={card.color}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                >
                    <S.CardTitle>{card.title}</S.CardTitle>
                    <S.CardValue>{card.value}</S.CardValue>
                    <S.CardSubValue $color={card.color}>{card.sub}</S.CardSubValue>
                </S.Card>
            ))}
        </S.CardsGrid>
    );
};