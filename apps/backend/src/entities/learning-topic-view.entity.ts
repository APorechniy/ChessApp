import { ViewColumn, ViewEntity } from "typeorm";
import { LevelView } from "./level-view.entity";

@ViewEntity({
    name: 'learning_topic_view'
})
export class LearningTopicView {
    @ViewColumn()
    id!: string;

    @ViewColumn()
    name!: string;

    @ViewColumn()
    description!: string;

    @ViewColumn()
    level!: LevelView;
}