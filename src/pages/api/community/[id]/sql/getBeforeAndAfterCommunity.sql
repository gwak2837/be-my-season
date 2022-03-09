SELECT id,
  title
FROM community
WHERE id IN (
    (
      SELECT id
      FROM community
      WHERE id > ?
      ORDER BY id
      LIMIT 1
    ), (
      SELECT id
      FROM community
      WHERE id < ?
      ORDER BY id DESC
      LIMIT 1
    )
  )