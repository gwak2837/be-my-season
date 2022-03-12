SELECT id,
  creation_time,
  title,
  description,
  price,
  `type`,
  `status`
FROM program
WHERE `status` = ?
ORDER BY id DESC
LIMIT ?, ?