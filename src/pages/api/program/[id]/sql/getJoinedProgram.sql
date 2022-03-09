SELECT program.id,
  program.title
FROM program
  JOIN user_x_program ON user_x_program.program_id = program.id
  AND user_x_program.user_id = ?