CREATE VIEW students_attended_view (attendanceId, student, attended) 
AS SELECT 
    sa.attendance_id,
    JSON_OBJECT("id", sv.id, "firstName", sv.firstName, "lastName", sv.lastName),
    sa.attended
FROM students_attended sa

LEFT JOIN student_view sv ON sa.student_id = sv.id;