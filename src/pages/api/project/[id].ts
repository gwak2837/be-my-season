import { NextApiRequest, NextApiResponse } from 'next'
import { isEmptyObject } from 'src/utils'

import deleteProject from './sql/deleteProject.sql'
import getProject from './sql/getProject.sql'
import updateProject from './sql/updateProject.sql'
import { connection } from '..'

export default async function handleProject(req: NextApiRequest, res: NextApiResponse) {
  // Get project
  if (req.method === 'GET') {
    const [rows] = await (await connection).query(getProject, [req.query.id])
    return res.status(200).json({ rows })
  }

  // Update project
  if (req.method === 'PUT') {
    if (isEmptyObject(req.body)) return res.status(400).send({ message: '값을 입력해주세요.' })

    const [rows] = await (await connection).query(updateProject, [req.query.id, req.body])
    return res.status(200).json({ rows })
  }

  // Delete project
  if (req.method === 'DELETE') {
    const [rows] = await (await connection).query(deleteProject, [req.query.id])
    return res.status(200).json({ rows })
  }

  // Else
  return res.status(405).send({ message: 'Method not allowed' })
}
