CREATE VIEW student_view (id, firstName, lastName, birthDate, level, fshrId, fideId, phone, email, joinDate, notes, paidLessons, isExcluded, balance) AS 
SELECT s.id, s.first_name, s.last_name, s.birth_date, 
    JSON_OBJECT("id", lv.id, "name", lv.name, "hoursRequired", lv.hoursRequired, "description", lv.description) as level,
    s.fshr_id, s.fide_id, s.phone, s.email, s.join_date as joinDate, s.notes, s.paid_lessons, s.is_excluded, ub.balance as balance

FROM students s
LEFT JOIN level_view lv ON s.level_id = lv.id
LEFT JOIN user_balance ub ON s.id = ub.user_id

ORDER BY last_name;