DELETE FROM review
WHERE id = ?
  AND `type` = 0
  AND author_id = ?