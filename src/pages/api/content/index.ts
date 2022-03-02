import type { NextApiRequest, NextApiResponse } from 'next'

import createContent from './sql/createContent.sql'
import getContents from './sql/createContent.sql'
import { connection } from '..'

export default async function handleContent(req: NextApiRequest, res: NextApiResponse) {
  // Get contents
  if (req.method === 'GET') {
    const [rows] = await (await connection).query(getContents, [])
    return res.status(200).json({ rows })
  }

  // Create content
  if (req.method === 'POST') {
    const [rows] = await (await connection).query(createContent, [])
    return res.status(200).json({ rows })
  }

  // Else
  return res.status(405).send({ message: 'Method not allowed' })
}
