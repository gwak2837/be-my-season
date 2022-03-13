SELECT qna.id,
  qna.creation_time,
  title,
  description,
  user.id AS user__id,
  user.nickname AS user__nickname
FROM qna
  JOIN user ON user.id = qna.author_id
WHERE program_id = ?
ORDER BY qna.id DESC