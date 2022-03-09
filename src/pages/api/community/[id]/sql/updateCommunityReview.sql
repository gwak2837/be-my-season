UPDATE review
SET modification_time = CURRENT_TIMESTAMP,
  title = ?,
  description = ?,
  point = ?
WHERE id = ?
  AND `type` = 1
  AND author_id = ?