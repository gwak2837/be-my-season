SELECT community.id,
  community.title
FROM community
  JOIN user_x_community ON user_x_community.community_id = community.id
  AND user_x_community.user_id = ?