CREATE VIEW students_balance_transaction_view AS SELECT 
sbt.id as id,
JSON_OBJECT("id", sv.id, "firstName", sv.firstName, "lastName", sv.lastName) as student,
JSON_OBJECT("id", p.id, "amountValue", p.amount_value, "createdAt", p.created_at, "status", p.status) as payment,
sbt.attendance_id as attendanceId, sbt.type as type, sbt.sum as sum, sbt.created_at as createdAt
FROM students_balance_transaction sbt

LEFT JOIN student_view sv ON sbt.student_id = sv.id
LEFT JOIN payments p ON sbt.payment_id = p.id;