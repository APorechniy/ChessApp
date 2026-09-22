import { type LearningTopics } from "../types";
import { api } from "../../../axios";
import { BASE_URL } from "../const/actions";

export type GetLearningTopicsParams = {
    levelId?: string
}

type Response = {
    learningTopicsList: LearningTopics[];
};

type GetLearningTopcisList = (params: GetLearningTopicsParams) => Promise<Response>;

const getLearningTopics: GetLearningTopcisList = async (params) => {
    const requestUrl = `${BASE_URL}${params?.levelId ? `?levelId=${params.levelId}` : ""}`
    const response = await api.get(requestUrl, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export default getLearningTopics;
