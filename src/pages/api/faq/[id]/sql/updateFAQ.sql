UPDATE faq
SET modification_time = CURRENT_TIMESTAMP,
  category = ?,
  title = ?,
  description = ?
WHERE id = ?