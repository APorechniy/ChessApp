import { type Quality } from "../types";
import { api } from "../../../axios";

export type GetQualitiesListParams = {
    labelFor: string
}

type Response = {
    qualitiesList: Quality[];
};

type GetQualitiesList = (params: GetQualitiesListParams) => Promise<Response>;

const getQualitiesList: GetQualitiesList = async ({ labelFor }) => {
    const response = await api.get(`/qualities/?labelFor=${labelFor}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default getQualitiesList;
