SELECT id,
  program.creation_time,
  title,
  price,
  description,
  detail,
  image_url,
  `type`,
  user_x_program.program_id
FROM program
  LEFT JOIN user_x_program ON user_x_program.program_id = program.id
  AND user_x_program.user_id = ?
WHERE id = ?