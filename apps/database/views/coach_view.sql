CREATE VIEW coach_view (id, firstName, lastName, birthDate, avatar, fshrId, fideId, phone, email, biography, joinDate, isFired) AS 
SELECT c.id, c.first_name, c.last_name, c.birth_date, c.avatar,
    c.fshr_id, c.fide_id, c.phone, c.email, c.biography, c.join_date, c.is_fired

FROM coaches c

ORDER BY last_name;