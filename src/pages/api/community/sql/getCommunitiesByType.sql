SELECT id,
  creation_time,
  title,
  description,
  `type`
FROM program
WHERE `type` = ?
ORDER BY id DESC
LIMIT ?, ?