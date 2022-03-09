DELETE FROM qna
WHERE id = ?
  AND `type` = 0
  AND author_id = ?