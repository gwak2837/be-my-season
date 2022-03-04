SELECT content.id,
  content.creation_time,
  title,
  description,
  `type`,
  user.id,
  user.nickname
FROM content
  JOIN user ON content.author_id = user.id
WHERE content.id = ?