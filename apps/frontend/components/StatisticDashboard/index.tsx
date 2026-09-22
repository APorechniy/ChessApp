import React, { useEffect } from 'react';
import * as S from './styled';
import { Header } from './Header';
import { StatCards } from './StatCard';
import { AttendanceChart } from './AttendanceChart';
import { TopicsProgress } from './TopicsProgress';
import { ActivityCalendar } from './ActivityCalendar';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getStudentStatistic } from '../../store/students/thunk/get-student-statistic';
import { Loader } from '../../atoms/Loader';

export const StatisticDashboard: React.FC = () => {
    const { currentUser } = useAppSelector(({ users }) => users)
    const { studentStatistic, isLoadingStudentStatistic } = useAppSelector(({ students }) => students)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (currentUser && currentUser.role === "student") {
            dispatch(getStudentStatistic({
                studentId: currentUser.id
            }))
        }
    }, [currentUser])

    return (
        <S.DashboardContainer>
            {
                (isLoadingStudentStatistic === "IDLE" || isLoadingStudentStatistic === "PENDING") &&
                <Loader />
            }
            {
                (isLoadingStudentStatistic === "SUCCESS" && studentStatistic === null)
                &&
                <S.EmptyContainer
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                    <S.IconBadge
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        {/* Иконка аналитики / графика */}
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="20" x2="18" y2="10" />
                            <line x1="12" y1="20" x2="12" y2="4" />
                            <line x1="6" y1="20" x2="6" y2="14" />
                        </svg>
                    </S.IconBadge>

                    <S.Title>Статистика пока недоступна</S.Title>

                    <S.Description>
                        Занимайтесь усерднее и скоро вы сможете наблюдать за своим прогрессом!
                    </S.Description>

                    <S.AccentBadge>
                        <span>⚡</span> Продолжайте обучение
                    </S.AccentBadge>
                </S.EmptyContainer>
            }
            {
                (isLoadingStudentStatistic === "SUCCESS" && studentStatistic)
                &&
                <>
                    <Header
                        studentName={currentUser.username}
                    />
                    <StatCards stats={studentStatistic} />
                    <S.ChartsGrid>
                        <AttendanceChart attendedLessonsCount={studentStatistic.lessons.visited} totalLessons={studentStatistic.lessons.total} />
                        <TopicsProgress topicsCoveredCount={studentStatistic.topics.learned} totalTopics={studentStatistic.topics.total} />
                        <ActivityCalendar activeDays={studentStatistic.activeDaysLastMonth} />
                    </S.ChartsGrid>
                </>
            }
        </S.DashboardContainer>
    );
};