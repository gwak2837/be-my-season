SELECT id,
  title
FROM project
WHERE id IN (
    (
      SELECT id
      FROM project
      WHERE id > ?
      ORDER BY id
      LIMIT 1
    ), (
      SELECT id
      FROM project
      WHERE id < ?
      ORDER BY id DESC
      LIMIT 1
    )
  );