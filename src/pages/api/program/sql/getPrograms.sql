SELECT id,
  creation_time,
  title,
  price,
  `type`,
  `status`
FROM program
ORDER BY id DESC
LIMIT ?, ?