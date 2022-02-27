import { NextApiRequest, NextApiResponse } from 'next'

import getPost from './sql/getPost.sql'
import { connection } from '..'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const [rows] = await (await connection).query(getPost, [req.query.id])
  res.status(200).json({ rows })
}
