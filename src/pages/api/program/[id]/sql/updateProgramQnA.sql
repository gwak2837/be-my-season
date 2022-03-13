UPDATE qna
SET modification_time = CURRENT_TIMESTAMP,
  title = ?,
  description = ?
WHERE id = ?
  AND author_id = ?