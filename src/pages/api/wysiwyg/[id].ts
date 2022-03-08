import { NextApiRequest, NextApiResponse } from 'next'
import { isEmptyObject } from 'src/utils'

import deleteWysiwyg from './sql/deleteWysiwyg.sql'
import getWysiwyg from './sql/getWysiwyg.sql'
import updateWysiwyg from './sql/updateWysiwyg.sql'
import { pool } from '..'

export default async function handleWysiwyg(req: NextApiRequest, res: NextApiResponse) {
  // Get wysiwyg
  if (req.method === 'GET') {
    const [rows] = await pool.query(getWysiwyg, [req.query.id])
    return res.status(200).json({ contents: (rows as any)[0].contents })
  }

  // Update wysiwyg
  if (req.method === 'PUT') {
    if (isEmptyObject(req.body)) return res.status(400).send({ message: '값을 입력해주세요.' })

    const [rows] = await pool.query(updateWysiwyg, [req.body.contents, req.query.id])
    return res.status(200).json({ rows })
  }

  // Delete wysiwyg
  if (req.method === 'DELETE') {
    const [rows] = await pool.query(deleteWysiwyg, [req.query.id])
    return res.status(200).json({ rows })
  }

  // Else
  return res.status(405).send({ message: 'Method not allowed' })
}
