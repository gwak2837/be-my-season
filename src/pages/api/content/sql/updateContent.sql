UPDATE content
SET modification_time = CURRENT_TIMESTAMP,
  description = ?
WHERE id = ?