CREATE VIEW task_view AS 
SELECT t.id, t.name, t.position,
    JSON_OBJECT("id", ltv.id, "name", ltv.name, "description", ltv.description, "level", ltv.level) as learningTopic,    
    JSON_OBJECT("id", q.id, "name", q.name, "label", q.label, "labelFor", q.labelFor, "lightColor", q.lightColor, "darkColor", q.darkColor) as quality  
FROM tasks t

LEFT JOIN quality_view q ON q.id = t.quality_id
LEFT JOIN learning_topic_view ltv ON ltv.id = t.learning_topic_id
WHERE t.is_removed = 0;