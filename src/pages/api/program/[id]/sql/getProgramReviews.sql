SELECT review.id,
  review.creation_time,
  title,
  description,
  point,
  user.id AS user__id,
  user.nickname AS user__nickname
FROM review
  JOIN user ON user.id = review.author_id
WHERE program_id = ?
ORDER BY review.id DESC