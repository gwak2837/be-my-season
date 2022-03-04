UPDATE wysiwyg
SET modification_time = CURRENT_TIMESTAMP,
  contents = ?
WHERE id = ?