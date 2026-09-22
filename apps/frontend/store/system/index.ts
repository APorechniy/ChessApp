import { Action, createSlice } from '@reduxjs/toolkit'
import { CLEAR_STORE } from '../const'
import { type SystemState, type AddNotificationPayload } from './types'
import { type PayloadAction } from '@reduxjs/toolkit'
import { getSettings } from './thunk/get-settings'
import { updateSettings } from './thunk/update-settings'
import { REHYDRATE } from 'redux-persist'

const initialState: SystemState = {
    isOpenModal: false,
    isOpenFirstLevelOverlay: false,
    currentPageName: 'Навигационная панель',

    systemTimezoneOffset: -new Date().getTimezoneOffset() / 60,

    settings: null,

    isDisabledNotifications: false,
    notifications: [],

    selectedSettingsTab: "MAIN_SETTINGS",

    datePickerDaysOffset: 3,

    modalContent: null,

    isLoadSettings: "IDLE",
    isUpdatedSettings: "IDLE",
}

export const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {
        handleOpenModal(state, action: PayloadAction<{ modalContent: SystemState["modalContent"] }>) {
            state.isOpenModal = true;
            state.modalContent = action.payload.modalContent;
        },
        handleCloseModal(state) {
            state.isOpenModal = false;
            state.modalContent = null;
        },
        handleShowOverlay(state) {
            state.isOpenFirstLevelOverlay = true;
        },
        handleHideOverlay(state) {
            state.isOpenFirstLevelOverlay = false;
        },
        handleChangeCurrentPage(state, action) {
            state.currentPageName = action.payload.pageName;
        },
        handleChangeDaysOffset(state, action) {
            state.datePickerDaysOffset = action.payload.daysOffset;
        },
        handleChangeSelectedSettingsTab(state, action) {
            state.selectedSettingsTab = action.payload.selectedSettingsTab;
        },
        handleClearIsUpdatedSettings(state) {
            state.isUpdatedSettings = "IDLE"
        },
        handleChangeIsDisabledNotifications(state, action: PayloadAction<{ isDisabled: boolean }>) {
            state.isDisabledNotifications = action.payload.isDisabled;
        },
        // Управление уведомлениями
        addNotification: (state, action: PayloadAction<AddNotificationPayload>) => {
            const id = action.payload.id || crypto.randomUUID();

            const newNotification = {
                autoCloseTimer: 5000,
                ...action.payload,
                id,
            };

            // unshift помещает элемент в НАЧАЛО массива (новое будет сверху)
            if (!state.isDisabledNotifications) {
                state.notifications.unshift(newNotification);
            }
        },
        removeNotification: (state, action: PayloadAction<string>) => {
            state.notifications = state.notifications.filter(
                (notification) => notification.id !== action.payload
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_STORE, () => initialState);

        builder.addCase(REHYDRATE, (state, action: any) => {
            // При восстановлении стора из redux-persist гарантируем,
            // что массив notifications будет пустым на старте
            if (action.payload?.system) {
                state.notifications = [];
            }
        });

        // get-settings
        builder.addCase(getSettings.fulfilled, (state, action) => {
            state.settings = action.payload.settings;
            state.isLoadSettings = "SUCCESS";
        });
        builder.addCase(getSettings.pending, (state) => {
            state.isLoadSettings = "PENDING";
        });
        builder.addCase(getSettings.rejected, (state) => {
            state.isLoadSettings = "ERROR";
            state.settings = null;
        });

        // update-settings
        builder.addCase(updateSettings.fulfilled, (state, action) => {
            state.isUpdatedSettings = action.payload.isUpdatedSettings ? "SUCCESS" : "ERROR";
        });
        builder.addCase(updateSettings.pending, (state) => {
            state.isUpdatedSettings = "PENDING";
        });
        builder.addCase(updateSettings.rejected, (state) => {
            state.isUpdatedSettings = "ERROR";
        });
    }
})

export const {
    handleOpenModal,
    handleCloseModal,
    handleShowOverlay,
    handleHideOverlay,
    handleChangeCurrentPage,
    handleChangeDaysOffset,
    handleChangeSelectedSettingsTab,
    handleClearIsUpdatedSettings,
    addNotification,
    removeNotification,
    handleChangeIsDisabledNotifications
} = systemSlice.actions;

export default systemSlice.reducer