import { type LearningTopics } from "../types";
import { api } from "../../../axios";
import { BASE_URL } from "../const/actions";

export type UpdateLearningTopicParams = {
    learningTopic: LearningTopics,
}

type Response = {
    isUpdateLearningTopic: boolean;
};

type UpdateLearningTopic = ({ learningTopic }: UpdateLearningTopicParams) => Promise<Response>;

const updateLearningTopic: UpdateLearningTopic = async ({ learningTopic }) => {
    const response = await api.put(BASE_URL, {
        learningTopic: learningTopic
    });

    return response.data;
};

export default updateLearningTopic;
