import { api } from "../../../axios";
import { BASE_URL } from "../const/actions";

export type RemoveLearningTopicParams = {
    learningTopicId: string,
}

type Response = {
    isRemoveLearningTopic: boolean;
};

type RemoveLearningTopic = ({ learningTopicId }: RemoveLearningTopicParams) => Promise<Response>;

const removeLearningTopic: RemoveLearningTopic = async ({ learningTopicId }) => {
    const response = await api.delete(`${BASE_URL}?learningTopicId=${learningTopicId}`);

    return response.data;
};

export default removeLearningTopic;
