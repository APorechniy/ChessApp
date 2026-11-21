CREATE VIEW chess_game_view (id, whitePlayer, blackPlayer, year, chessOpening) AS 
    SELECT cg.id, cg.white_player, cg.black_player, cg.year, 
    JSON_OBJECT("id", co.id, "name", co.name) as chessOpening
FROM chess_games cg
LEFT JOIN chess_openings co ON cg.chess_opening_id = co.id;