import { configureStore, createAction, combineReducers } from '@reduxjs/toolkit'
import attendanceReducer from './attendance'
import attendancePresetsReducer from './attendance-presets'
import authReducer from './auth'
import chessGamesReducer from './chess-games'
import chessOpeningsReducer from './chess-openings'
import learningTopicsReducer from './learning-topics'
import levelsReducer from './levels'
import paymentsReducer from './payments'
import qualitiesReducer from './quality'
import reportsReducer from './reports'
import studentsReducer from './students'
import studentsAttendedReducer from './students-attended'
import studentsGroupsReducer from './students-groups'
import systemReducer from './system'
import tasksReducer from './tasks'
import userBalanceReducer from './user-balance'
import userPaymentsReducer from './user-payments'
import usersReducer from './users'
import { useSelector, useDispatch, type TypedUseSelectorHook } from 'react-redux'
import { persistStore, persistReducer, createMigrate, type MigrationManifest } from 'redux-persist'
import { CLEAR_STORE } from './const'
import { persistStorage } from './persist-storage'

const reducers = combineReducers({
    attendance: attendanceReducer,
    attendancePresets: attendancePresetsReducer,
    auth: authReducer,
    chessGames: chessGamesReducer,
    chessOpenings: chessOpeningsReducer,
    levels: levelsReducer,
    learningTopics: learningTopicsReducer,
    payments: paymentsReducer,
    quality: qualitiesReducer,
    reports: reportsReducer,
    students: studentsReducer,
    studentsAttended: studentsAttendedReducer,
    studentsGroups: studentsGroupsReducer,
    system: systemReducer,
    tasks: tasksReducer,
    userBalance: userBalanceReducer,
    userPayments: userPaymentsReducer,
    users: usersReducer,
});

const migration: MigrationManifest = {
    0: (state) => {
        // Версия 0: очищаем старое состояние из localStorage
        return undefined;
    },
    1: (state) => {
        // Версия 1: новая структура с sessionStorage
        // Оставляем только то, что указано в whitelist
        return state;
    },
    2: (state: any) => {
        // Версия 2: Добавляем новое поле notifications в слайс system
        if (!state) {
            return state;
        }

        return {
            ...state,
            system: {
                ...state?.system,
                // Если system уже существовал, сохраняем его поля и гарантируем наличие notifications
                notifications: [],
                isDisabledNotifications: false,
            },
        };
    }
}

const persistConfig = {
    key: "root",
    version: 2,
    storage: persistStorage,
    whitelist: ['auth', 'system', 'users'],
    migrate: createMigrate(migration, { debug: true }),
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const clearStore = createAction(CLEAR_STORE);
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;