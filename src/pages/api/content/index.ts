import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyJWT } from 'src/utils/jwt'

import createContent from './sql/createContent.sql'
import getContents from './sql/getContents.sql'
import getContentsByType from './sql/getContentsByType.sql'
import { pool } from '..'

const count = 12

export default async function handleContent(req: NextApiRequest, res: NextApiResponse) {
  // Get contents
  if (req.method === 'GET') {
    const { page, type } = req.query
    if (!page) return res.status(400).send('Please check your input of request')

    try {
      if (type) {
        const [rows] = await pool.query(getContentsByType, [+type, +page * count, count])
        return res.status(200).json(rows)
      } else {
        const [rows] = await pool.query(getContents, [+page * count, count])
        return res.status(200).json(rows)
      }
    } catch (error) {
      return res.status(500).send('500: 데이터베이스 쿼리 오류')
    }
  }

  // Create content
  if (req.method === 'POST') {
    const jwt = req.headers.authorization
    if (!jwt) return res.status(401).send('Need to authenticate')

    const verifiedJwt = await verifyJWT(jwt).catch(() => null)
    if (!verifiedJwt) return res.status(400).send('Invalid JWT')
    if (!verifiedJwt.isAdmin) return res.status(403).send('Require administrator privileges')

    const { title, description, type } = req.body
    if (!title || !description || type === undefined)
      return res.status(400).send('Please check your inputs of request')

    const [rows] = await pool.query(createContent, [title, description, +type, verifiedJwt.userId])
    return res.status(200).json({ rows })
  }

  // Else
  return res.status(405).send('Method not allowed')
}
