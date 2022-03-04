SELECT content.id,
  content.creation_time,
  title,
  description,
  `type`
FROM content
WHERE `type` = ?
ORDER BY id DESC
LIMIT ?, ?