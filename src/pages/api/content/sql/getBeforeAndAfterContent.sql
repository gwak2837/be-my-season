SELECT id,
  title
FROM content
WHERE id IN (
    (
      SELECT id
      FROM content
      WHERE id > ?
      ORDER BY id
      LIMIT 1
    ), (
      SELECT id
      FROM content
      WHERE id < ?
      ORDER BY id DESC
      LIMIT 1
    )
  );