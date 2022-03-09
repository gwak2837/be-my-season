SELECT id,
  category,
  title,
  description
FROM faq
WHERE category = ?
ORDER BY id DESC