import React from 'react';
import { motion } from 'framer-motion';
import * as S from './styled';

type Props = {
    topicsCoveredCount: number;
    totalTopics: number;
}

export const TopicsProgress: React.FC<Props> = ({ topicsCoveredCount, totalTopics = 100 }) => {
    const percentage = Math.min(100, Math.round((topicsCoveredCount / totalTopics) * 100));

    // Длина окружности для радиуса r=40 (2 * π * r)
    const circumference = 251.32;
    // Смещение штриха для анимирования процента
    const strokeDashoffset = circumference - (circumference * percentage) / 100;

    return (
        <S.Card>
            <S.Title>Статус прохождения тем</S.Title>
            <S.ChartContainer>
                <S.DonutWrapper>
                    <svg viewBox="0 0 100 100" width="100%" height="100%">
                        {/* Фоновый серый круг */}
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            stroke="rgba(0,0,0,0.06)"
                            strokeWidth="12"
                        />

                        {/* Динамический анимированный сектор пройденных тем */}
                        <motion.circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            stroke="#21BDCA"
                            strokeWidth="12"
                            strokeDasharray={circumference}
                            strokeDashoffset={circumference}
                            strokeLinecap="round"
                            animate={{ strokeDashoffset }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                        />
                    </svg>
                    <S.CenterText>
                        {percentage}%
                        <span>Пройдено</span>
                    </S.CenterText>
                </S.DonutWrapper>

                <S.Legend>
                    <S.LegendItem>
                        <S.Dot $color="#21BDCA" /> Изучено ({topicsCoveredCount} тем)
                    </S.LegendItem>
                    <S.LegendItem>
                        <S.Dot $color="rgba(0,0,0,0.15)" /> Осталось ({Math.max(0, totalTopics - topicsCoveredCount)} тем)
                    </S.LegendItem>
                </S.Legend>
            </S.ChartContainer>
        </S.Card>
    )
};