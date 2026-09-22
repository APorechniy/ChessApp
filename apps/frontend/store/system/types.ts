import type { RequestStatus } from "../../types/types";

export type NotificationVariant = 'error' | 'warning' | 'success' | 'info';

export type SettingsTabs = "MAIN_SETTINGS" | "COACHES" | "GROUPS" | "PRESETS" | "UKASSA"

export type Notification = {
    id: string;
    title: string;
    subtitle?: string;
    variant: NotificationVariant;
    autoCloseTimer?: number; // в миллисекундах
};

export type AddNotificationPayload = Omit<Notification, 'id'> & {
    id?: string;
};

export type Settings = {
    id: string;
    name: string;
    logo?: string;
    vkLink?: string;
    email?: string;
    phone?: string;
    legalName?: string;
    itin?: string;
    ukassaId?: string;
    ukassaApiKey?: string;
    ukassaIsConnected: boolean;
}

export type SystemState = {
    isOpenModal: boolean,
    isOpenFirstLevelOverlay: boolean,
    currentPageName: string,

    isDisabledNotifications: boolean,
    notifications: Notification[],

    datePickerDaysOffset: number,

    settings: Settings | null,

    selectedSettingsTab: SettingsTabs,

    systemTimezoneOffset: number,

    modalContent:
    "CREATE_STUDENT" |
    "CREATE_PRESET" |
    "CREATE_GROUP" |
    "CREATE_COACH" |
    "DETAIL_STUDENT" |
    "DETAIL_COACH" |
    "CREATE_ATTENDANCE" |
    "CREATE_CHESS_OPENING" |
    "CREATE_CHESS_GAME" |
    "CREATE_LEARNING_TOPIC" |
    "DETAIL_ATTENDANCE" |
    "DETAIL_PRESET" |
    "DETAIL_GROUP" |
    "CREATE_TASK" |
    "DETAIL_TASK" |
    "DETAIL_LEARNING_TOPIC" |
    "PUT_BALANCE" |
    null,

    isLoadSettings: RequestStatus,
    isUpdatedSettings: RequestStatus,
}