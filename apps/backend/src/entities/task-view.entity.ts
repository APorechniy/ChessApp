import { ViewEntity, ViewColumn } from "typeorm";
import { type LearningTopicView } from "./learning-topic-view.entity";
import { type QualityView } from "./quality-view.entity";

@ViewEntity({
    name: "task_view"
})
export class TaskView {
    @ViewColumn()
    id!: string;

    @ViewColumn()
    name!: string;

    @ViewColumn()
    description!: string | null;

    @ViewColumn()
    learningTopic!: LearningTopicView;

    @ViewColumn()
    position!: string | null;

    @ViewColumn()
    quality!: QualityView;
}