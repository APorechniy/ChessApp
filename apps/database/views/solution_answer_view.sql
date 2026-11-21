CREATE OR REPLACE VIEW solution_answer_view AS
SELECT
    sa.id                                        AS id,
    sa.homework_id                               AS homeworkId,
    sa.homework_solution_id                      AS homeworkSolutionId,
    JSON_OBJECT(
        'id',         htv.id,
        'orderIndex', htv.orderIndex,
        'task',       htv.task
    )                                           AS homeworkTask,
    sa.answer_text                              AS answerText,
    sa.started_at                               AS startedAt,
    sa.submitted_at                             AS submittedAt,
    sa.checked_at                               AS checkedAt,
    sa.status,
    sa.coach_comment                            AS coachComment
FROM solution_answers sa
LEFT JOIN homework_tasks_view htv ON htv.id = sa.homework_task_id;