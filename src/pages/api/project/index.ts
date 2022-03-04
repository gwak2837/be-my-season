import { NextApiRequest, NextApiResponse } from 'next'
import { isEmptyObject } from 'src/utils'

import createProject from './sql/createProject.sql'
import getProjects from './sql/getProjects.sql'
import { connection } from '..'

export default async function handleProjects(req: NextApiRequest, res: NextApiResponse) {
  // Get project
  if (req.method === 'GET') {
    const { page, type } = req.query
    if (!page) return res.status(400).send({ message: 'Please check your input of request' })

    const count = 2

    // try {
    //   if (type) {
    //     const [rows] = await (
    //       await connection
    //     ).query(getProjectsByType, [+type, +page * count, count])
    //     return res.status(200).json({ projects: rows })
    //   } else {
    //     const [rows] = await (await connection).query(getProjects, [+page * count, count])
    //     return res.status(200).json({ projects: rows })
    //   }
    // } catch (error) {
    //   return res.status(500).send({ message: '500: 데이터베이스 쿼리 오류' })
    // }
  }

  // Create project
  if (req.method === 'POST') {
    const [rows] = await (await connection).query(createProject, [])
    return res.status(200).json({ rows })
  }

  // Else
  return res.status(405).send({ message: 'Method not allowed' })
}
