SELECT id,
  creation_time,
  title,
  description,
  author_id
FROM qna
WHERE `type` = 1
  AND target_id = ?