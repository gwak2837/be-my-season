import { NextApiRequest, NextApiResponse } from 'next'
import { isEmptyObject } from 'src/utils'

import deleteContent from './sql/deleteContent.sql'
import getContent from './sql/getContent.sql'
import updateContent from './sql/updateContent.sql'
import { connection } from '..'

export default async function handleContent(req: NextApiRequest, res: NextApiResponse) {
  // Get content
  if (req.method === 'GET') {
    const [rows] = await (await connection).query(getContent, [req.query.id])
    return res.status(200).json({ rows })
  }

  // Update content
  if (req.method === 'PUT') {
    if (isEmptyObject(req.body)) return res.status(400).send({ message: '값을 입력해주세요.' })

    const [rows] = await (await connection).query(updateContent, [req.query.id])
    return res.status(200).json({ rows })
  }

  // Delete content
  if (req.method === 'DELETE') {
    const [rows] = await (await connection).query(deleteContent, [req.query.id])
    return res.status(200).json({ rows })
  }

  // Else
  return res.status(405).send({ message: 'Method not allowed' })
}
