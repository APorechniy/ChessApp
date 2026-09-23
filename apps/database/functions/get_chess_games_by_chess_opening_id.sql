DELIMITER //
CREATE FUNCTION get_chess_games_by_chess_opening_id(chess_opening_id VARCHAR(36))
RETURNS JSON
DETERMINISTIC
BEGIN
    DECLARE result JSON;
    
    SELECT JSON_ARRAYAGG(JSON_OBJECT("id", cg.id, "whitePlayer", cg.white_player, "blackPlayer", cg.black_player, "year", cg.year, "chessOpening", JSON_OBJECT("id", co.id, "name", co.name))) INTO result    
    FROM chess_games cg

    LEFT JOIN chess_openings co ON co.id = cg.chess_opening_id
    WHERE cg.chess_opening_id = chess_opening_id;
    
    RETURN result;
END //
DELIMITER ;