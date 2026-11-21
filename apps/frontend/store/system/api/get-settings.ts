import { type Settings } from "../types";
import { api } from "../../../network/instance";

type Response = {
    settings: Settings;
};

type GetSettings = () => Promise<Response>;

const getSettings: GetSettings = async () => {
    const response = await api.get(`/settings/`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default getSettings;
