SELECT content.id,
  content.creation_time,
  title,
  description,
  `type`,
  user.id,
  user.profile_image_url,
  user.nickname
FROM content
  LEFT JOIN user ON content.author_id = user.id
GROUP BY content.id,
  user.id
ORDER BY content.id DESC
FETCH FIRST ? ROWS ONLY