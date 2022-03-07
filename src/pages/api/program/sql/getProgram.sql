SELECT program.id,
  program.creation_time,
  title,
  description,
  `type`,
  user.id,
  user.nickname
FROM program
  JOIN user ON program.author_id = user.id
WHERE program.id = ?