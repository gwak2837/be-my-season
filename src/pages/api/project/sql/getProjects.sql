SELECT id,
  creation_time,
  title,
  image_url
FROM project
ORDER BY id DESC
LIMIT ?, ?