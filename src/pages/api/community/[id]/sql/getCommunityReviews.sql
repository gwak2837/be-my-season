SELECT id,
  creation_time,
  title,
  description,
  point,
  author_id
FROM review
WHERE `type` = 1
  AND target_id = ?