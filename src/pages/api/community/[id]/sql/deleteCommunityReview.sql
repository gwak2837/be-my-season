DELETE FROM review
WHERE id = ?
  AND `type` = 1
  AND author_id = ?