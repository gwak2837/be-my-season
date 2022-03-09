import type { NextApiRequest, NextApiResponse } from 'next'

import createContent from './sql/createContent.sql'
import getContents from './sql/getContents.sql'
import getContentsByType from './sql/getContentsByType.sql'
import { pool } from '..'

const count = 2

export default async function handleContent(req: NextApiRequest, res: NextApiResponse) {
  // Get contents
  if (req.method === 'GET') {
    const { page, type } = req.query
    if (!page) return res.status(400).send('Please check your input of request')

    try {
      if (type) {
        const [rows] = await pool.query(getContentsByType, [+type, +page * count, count])
        return res.status(200).json({ contents: rows })
      } else {
        const [rows] = await pool.query(getContents, [+page * count, count])
        return res.status(200).json({ contents: rows })
      }
    } catch (error) {
      return res.status(500).send('500: 데이터베이스 쿼리 오류')
    }
  }

  // Create content
  if (req.method === 'POST') {
    const [rows] = await pool.query(createContent, [])
    return res.status(200).json({ rows })
  }

  // Else
  return res.status(405).send('Method not allowed')
}
