SELECT id,
  creation_time,
  title,
  `type`
FROM program
ORDER BY id DESC
LIMIT ?, ?