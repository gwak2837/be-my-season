SELECT id,
  password_hash,
  is_admin
FROM user
WHERE login_id = ?