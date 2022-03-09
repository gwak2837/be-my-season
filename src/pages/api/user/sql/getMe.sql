SELECT id,
  title,
  image_url
FROM program
  JOIN user_x_program ON user_x_program.program_id = program.id
  AND user_x_program.user_id = ?
UNION
SELECT id,
  title,
  image_url
FROM community
  JOIN user_x_community ON user_x_community.community_id = community.id
  AND user_x_community.user_id = ?