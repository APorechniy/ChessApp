import { type Settings } from "../types";
import { api } from "../../../axios";

export type UpdateSettingsParams = {
    settings: Settings;
}

type Response = {
    isUpdatedSettings: boolean
};

type UpdateSettings = (params: UpdateSettingsParams) => Promise<Response>;

const updateSettings: UpdateSettings = async ({ settings }) => {
    const response = await api.put(`/settings/`, {
        headers: {
            "Content-Type": "application/json",
        },
        settings: settings
    });

    return response.data;
};

export default updateSettings;
