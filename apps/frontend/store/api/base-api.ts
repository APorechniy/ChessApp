import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './axios-base-query'

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery,
    tagTypes: [
        'Students', 'Student', 'StudentStatistic',
        'Attendance', 'AttendancePresets',
        'ChessGames', 'ChessOpenings',
        'Homeworks', 'Levels', 'LearningTopics',
        'Payments', 'Quality', 'Reports',
        'Tasks', 'UserBalance', 'UserPayments', 'Users',
    ],
    endpoints: () => ({}),
})