DELIMITER //
CREATE FUNCTION get_tasks_by_learning_topic_id(learning_topic_id VARCHAR(36))
RETURNS JSON
DETERMINISTIC
BEGIN
    DECLARE result JSON;
    
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            "id", t.id, 
            "name", t.name, 
            "learningTopic", JSON_OBJECT("id", ltv.id, "name", ltv.name, "description", ltv.description, "level", ltv.level),
            "quality", JSON_OBJECT("id", q.id, "name", q.name, "label", q.label, "lightColor", q.lightColor, "darkColor", q.darkColor)
            )
        ) INTO result    
    FROM tasks t

    LEFT JOIN quality_view q ON q.id = t.quality_id
    LEFT JOIN learning_topic_view ltv ON ltv.id = t.learning_topic_id
    WHERE t.learning_topic_id = learning_topic_id;
    
    RETURN result;
END //
DELIMITER ;