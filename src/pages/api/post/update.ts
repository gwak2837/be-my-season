import { NextApiRequest, NextApiResponse } from 'next'

import updatePost from './sql/updatePost.sql'
import { connection } from '..'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const [rows] = await (await connection).query(updatePost, [req.query.id])
  res.status(200).json({ rows })
}
