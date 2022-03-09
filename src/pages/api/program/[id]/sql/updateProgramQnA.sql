UPDATE qna
SET modification_time = CURRENT_TIMESTAMP,
  title = ?,
  description = ?
WHERE id = ?
  AND `type` = 0
  AND author_id = ?