SELECT id,
  title
FROM program
WHERE id IN (
    (
      SELECT id
      FROM program
      WHERE id > ?
      ORDER BY id
      LIMIT 1
    ), (
      SELECT id
      FROM program
      WHERE id < ?
      ORDER BY id DESC
      LIMIT 1
    )
  );