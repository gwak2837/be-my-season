import { NextApiRequest, NextApiResponse } from 'next'

import deletePost from './sql/deletePost.sql'
import { connection } from '..'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const [rows] = await (await connection).query(deletePost, [req.query.id])
  res.status(200).json({ rows })
}
