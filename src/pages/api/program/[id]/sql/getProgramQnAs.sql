SELECT id,
  creation_time,
  title,
  description,
  author_id
FROM qna
WHERE program_id = ?