import { NextApiRequest, NextApiResponse } from 'next'
import { isEmptyObject } from 'src/utils'
import { verifyJWT } from 'src/utils/jwt'

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
    const jwt = req.headers.authorization
    if (!jwt) return res.status(401).send('Need to authenticate')

    const verifiedJwt = await verifyJWT(jwt).catch(() => null)
    if (!verifiedJwt) return res.status(400).send('Invalid JWT')
    if (!verifiedJwt.isAdmin) return res.status(403).send('Require administrator privileges')

    const { title, description } = req.body
    if (!title || !description) return res.status(400).send('Please check your inputs of request')

    await pool.query(updateContent, [title, description, req.query.id])
    return res.status(200).json({ message: 'Update complete' })
  }

  // Delete content
  if (req.method === 'DELETE') {
    const jwt = req.headers.authorization
    if (!jwt) return res.status(401).send('Need to authenticate')

    const verifiedJwt = await verifyJWT(jwt).catch(() => null)
    if (!verifiedJwt) return res.status(400).send('Invalid JWT')
    if (!verifiedJwt.isAdmin) return res.status(403).send('Require administrator privileges')

    const [rows] = await pool.query(deleteContent, [req.query.id])
    return res.status(200).json({ rows })
  }

  // Else
  return res.status(405).send('Method not allowed')
}
