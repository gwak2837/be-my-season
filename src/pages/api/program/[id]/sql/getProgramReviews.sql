SELECT id,
  creation_time,
  title,
  description,
  point,
  author_id
FROM review
WHERE program_id = ?