import { NextApiRequest, NextApiResponse } from 'next'
import { isEmptyObject } from 'src/utils'

import getCurrentProject from './sql/getCurrentProject.sql'
import { pool } from '..'

export default async function handleCurrentProject(req: NextApiRequest, res: NextApiResponse) {
  // Get
  if (req.method === 'GET') {
    const [rows] = await pool.query(getCurrentProject, [req.query.id])
    return res.status(200).json((rows as any)[0])
  }

  // Else
  return res.status(405).send('Method not allowed')
}
