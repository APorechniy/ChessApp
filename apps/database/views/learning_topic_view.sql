CREATE VIEW learning_topic_view (id, name, description, level) AS SELECT lt.id, lt.name, lt.description,
JSON_OBJECT("id", lv.id, "name", lv.name, "hoursRequired", lv.hoursRequired, "description", lv.description) as level
FROM learning_topics lt
LEFT JOIN level_view lv ON lt.level_id = lv.id;