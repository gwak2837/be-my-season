UPDATE review
SET modification_time = CURRENT_TIMESTAMP,
  title = ?,
  description = ?,
  point = ?
WHERE id = ?
  AND author_id = ?