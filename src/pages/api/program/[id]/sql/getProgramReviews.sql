SELECT id,
  creation_time,
  title,
  description,
  point,
  author_id
FROM review
WHERE `type` = 0
  AND target_id = ?