import { NextApiRequest, NextApiResponse } from 'next'
import { isEmptyObject } from 'src/utils'

import deleteContent from './sql/deleteContent.sql'
import getBeforeAndAfterContent from './sql/getBeforeAndAfterContent.sql'
import getContent from './sql/getContent.sql'
import updateContent from './sql/updateContent.sql'
import { pool } from '..'

export default async function handleContent(req: NextApiRequest, res: NextApiResponse) {
  // Get content
  if (req.method === 'GET') {
    const contentId = req.query.id

    const [rows, rows2] = await Promise.all([
      pool.query(getContent, [contentId]),
      pool.query(getBeforeAndAfterContent, [contentId, contentId]),
    ])

    const contents = rows2[0] as any

    return res.status(200).json({
      nextContent: contents[1]
        ? contents[1].id > contentId
          ? contents[1]
          : null
        : contents[0].id > contentId
        ? contents[0]
        : null,
      content: (rows[0] as any)[0],
      previousContent: contents[0]?.id < contentId ? contents[0] : null,
    })
  }

  // Update content
  if (req.method === 'PUT') {
    if (isEmptyObject(req.body)) return res.status(400).send({ message: '값을 입력해주세요.' })

    await pool.query(updateContent, [req.body.description, req.query.id])
    return res.status(200).json({ message: 'Update complete' })
  }

  // Delete content
  if (req.method === 'DELETE') {
    const [rows] = await pool.query(deleteContent, [req.query.id])
    return res.status(200).json({ rows })
  }

  // Else
  return res.status(405).send({ message: 'Method not allowed' })
}
