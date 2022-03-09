UPDATE qna
SET modification_time = CURRENT_TIMESTAMP,
  title = ?,
  description = ?
WHERE id = ?
  AND `type` = 1
  AND author_id = ?