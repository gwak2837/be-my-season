import { NextApiRequest, NextApiResponse } from 'next'
import { isEmptyObject } from 'src/utils'
import { verifyJWT } from 'src/utils/jwt'

import deleteProject from './sql/deleteProject.sql'
import getBeforeAndAfterProject from './sql/getBeforeAndAfterProject.sql'
import getProject from './sql/getProject.sql'
import updateProject from './sql/updateProject.sql'
import { pool } from '..'

export default async function handleProject(req: NextApiRequest, res: NextApiResponse) {
  // Get project
  if (req.method === 'GET') {
    const projectId = req.query.id

    const [rows, rows2] = await Promise.all([
      pool.query(getProject, [projectId]),
      pool.query(getBeforeAndAfterProject, [projectId, projectId]),
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
    const jwt = req.headers.authorization
    if (!jwt) return res.status(401).send('Need to authenticate')

    const verifiedJwt = await verifyJWT(jwt).catch(() => null)
    if (!verifiedJwt) return res.status(400).send('Invalid JWT')
    if (!verifiedJwt.isAdmin) return res.status(403).send('Require administrator privileges')

    const { description } = req.body
    if (!description) return res.status(400).send('Please check your inputs of request')

    const a = await pool.query(updateProject, [description, req.query.id])
    return res.status(200).json({ message: 'Update complete' })
  }

  // Delete project
  if (req.method === 'DELETE') {
    const [rows] = await pool.query(deleteProject, [req.query.id])
    return res.status(200).json({ rows })
  }

  // Else
  return res.status(405).send('Method not allowed')
}
