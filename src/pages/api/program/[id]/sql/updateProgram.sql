UPDATE program
SET modification_time = CURRENT_TIMESTAMP,
  title = ?,
  price = ?,
  description = ?,
  detail = ?,
  image_url = ?,
  `type` = ?
WHERE id = ?