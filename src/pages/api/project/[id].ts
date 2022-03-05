import { NextApiRequest, NextApiResponse } from 'next'
import { isEmptyObject } from 'src/utils'

import deleteProject from './sql/deleteProject.sql'
import getBeforeAndAfterProject from './sql/getBeforeAndAfterProject.sql'
import getProject from './sql/getProject.sql'
import updateProject from './sql/updateProject.sql'
import { connection } from '..'

export default async function handleProject(req: NextApiRequest, res: NextApiResponse) {
  // Get project
  if (req.method === 'GET') {
    const projectId = req.query.id

    const [rows, rows2] = await Promise.all([
      (await connection).query(getProject, [projectId]),
      (await connection).query(getBeforeAndAfterProject, [projectId, projectId]),
    ])

    const projects = rows2[0] as any

    return res.status(200).json({
      nextProject: projects[1]
        ? projects[1].id > projectId
          ? projects[1]
          : null
        : projects[0].id > projectId
        ? projects[0]
        : null,
      project: (rows[0] as any)[0],
      previousProject: projects[0]?.id < projectId ? projects[0] : null,
    })
  }

  // Update project
  if (req.method === 'PUT') {
    if (isEmptyObject(req.body)) return res.status(400).send({ message: '값을 입력해주세요.' })

    await (await connection).query(updateProject, [req.body.project, req.query.id])
    return res.status(200).send({ message: 'Update complete' })
  }

  // Delete project
  if (req.method === 'DELETE') {
    const [rows] = await (await connection).query(deleteProject, [req.query.id])
    return res.status(200).json({ rows })
  }

  // Else
  return res.status(405).send({ message: 'Method not allowed' })
}
