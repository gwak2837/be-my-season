SELECT id,
  creation_time,
  title,
  description,
  author_id
FROM qna
WHERE `type` = 0
  AND target_id = ?