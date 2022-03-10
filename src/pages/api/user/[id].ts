import { NextApiRequest, NextApiResponse } from 'next'

import getUser from './sql/getUser.sql'
import { pool } from '..'

export default async function handleUser(req: NextApiRequest, res: NextApiResponse) {
  // Get user
  if (req.method === 'GET') {
    const [rows] = await pool.query(getUser, [req.query.id])
    return res.status(200).json({ rows })
  }

  // Else
  return res.status(405).send('Method not allowed')
}
