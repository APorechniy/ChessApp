CREATE VIEW attendance_preset_view AS 
SELECT ap.id, ap.start_time_local AS startTimeLocal, ap.end_time_local AS endTimeLocal, 
    ap.timezone, ap.type, ap.rrule, ap.end_date AS endDate, ap.excluded_dates AS excludedDates,
    NULLIF(
        JSON_OBJECT("id", s.id, "firstName", s.firstName, "lastName", s.lastName),
        JSON_OBJECT("id", NULL, "firstName", NULL, "lastName", NULL)
    ) as `student`,
    NULLIF(
        JSON_OBJECT("id", sgv.id, "name", sgv.name, "description", sgv.description, "color", sgv.color, "students", sgv.students),
        JSON_OBJECT("id", NULL, "name", NULL, "description", NULL, "color", NULL, "students", NULL)
    ) as `group`

FROM attendance_preset ap      

LEFT JOIN student_view s ON s.id = ap.student_id 
LEFT JOIN students_group_view sgv ON sgv.id = ap.students_group_id;