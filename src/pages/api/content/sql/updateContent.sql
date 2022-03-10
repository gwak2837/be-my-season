UPDATE content
SET modification_time = CURRENT_TIMESTAMP,
  title = ?,
  description = ?
WHERE id = ?