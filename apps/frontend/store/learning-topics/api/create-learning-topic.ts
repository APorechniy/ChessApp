import { type LearningTopicWithoutId } from "../types";
import { api } from "../../../axios";
import { BASE_URL } from "../const/actions";

export type CreateLearningTopicParams = {
    learningTopic: LearningTopicWithoutId,
}

type Response = {
    isCreatedLearningTopic: boolean;
};

type CreateLearningTopic = ({ learningTopic }: CreateLearningTopicParams) => Promise<Response>;

const createLearningTopic: CreateLearningTopic = async ({ learningTopic }) => {
    const response = await api.post(BASE_URL, {
        learningTopic: learningTopic
    });

    return response.data;
};

export default createLearningTopic;
