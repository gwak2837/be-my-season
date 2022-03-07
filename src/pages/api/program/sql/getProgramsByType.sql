SELECT id,
  creation_time,
  title,
  description,
  price,
  `type`
FROM program
WHERE `type` = ?
ORDER BY id DESC
LIMIT ?, ?