import React from 'react';
import { motion } from 'framer-motion';
import * as S from './styled';

interface AttendanceChartProps {
    attendedLessonsCount: number;
    totalLessons?: number;
}

export const AttendanceChart: React.FC<AttendanceChartProps> = ({
    attendedLessonsCount,
    totalLessons = 50,
}) => {
    const ratio = Math.min(1, attendedLessonsCount / totalLessons);

    // Динамически подстраиваем кривизну графика под реальное число посещений
    const maxY = 160 - ratio * 130;
    const midY = 160 - ratio * 70;

    const pathD = `M 0 160 Q 120 ${midY}, 240 ${maxY} T 480 ${maxY - 10} L 480 180 L 0 180 Z`;
    const strokePathD = `M 0 160 Q 120 ${midY}, 240 ${maxY} T 480 ${maxY - 10}`;

    return (
        <S.Card>
            <S.Title>Динамика посещаемости ({attendedLessonsCount} из {totalLessons} уроков)</S.Title>
            <S.ChartWrapper>
                <svg viewBox="0 0 480 180" width="100%" height="100%" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#646cff" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#646cff" stopOpacity="0.0" />
                        </linearGradient>
                    </defs>

                    <motion.path
                        d={pathD}
                        fill="url(#attendanceGradient)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    />

                    <motion.path
                        d={strokePathD}
                        fill="none"
                        stroke="#646cff"
                        strokeWidth="4"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.2, ease: 'easeInOut' }}
                    />
                </svg>
            </S.ChartWrapper>
        </S.Card>
    );
};