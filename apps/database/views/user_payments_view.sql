CREATE VIEW user_payments_view AS SELECT 
JSON_OBJECT("id", sv.id, "firstName", sv.firstName, "lastName", sv.lastName) as user,
JSON_OBJECT("id", p.id, "amountValue", p.amount_value, "createdAt", p.created_at, "status", p.status) as payment
FROM user_payments up

LEFT JOIN student_view sv ON up.user_id = sv.id
LEFT JOIN payments p ON up.payment_id = p.id;