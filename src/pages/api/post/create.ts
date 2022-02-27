import { NextApiRequest, NextApiResponse } from 'next'

import createPost from './sql/createPost.sql'
import { connection } from '..'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const [rows] = await (await connection).query(createPost, [req.query.id])
  res.status(200).json({ rows })
}
