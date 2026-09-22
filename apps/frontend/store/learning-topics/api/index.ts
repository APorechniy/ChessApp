import createLearningTopic from "./create-learning-topic"
import getLearningTopics from "./get-learning-topics"
import removeLearningTopic from "./remove-learning-topic"
import updateLearningTopic from "./update-learning-topic"

export const learningTopicsApi = {
    getLearningTopics,
    createLearningTopic,
    updateLearningTopic,
    removeLearningTopic,
}