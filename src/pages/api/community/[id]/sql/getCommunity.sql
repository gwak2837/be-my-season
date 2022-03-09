SELECT id,
  community.creation_time,
  title,
  description,
  detail,
  price,
  `type`,
  user_x_community.community_id
FROM community
  LEFT JOIN user_x_community ON user_x_community.community_id = community.id
  AND user_x_community.user_id = ?
WHERE id = ?