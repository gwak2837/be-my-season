UPDATE program
SET modification_time = CURRENT_TIMESTAMP,
  description = ?,
  detail = ?
WHERE id = ?