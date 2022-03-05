import { NextApiRequest, NextApiResponse } from 'next'
import { isEmptyObject } from 'src/utils'

import createProject from './sql/createProject.sql'
import getProjects from './sql/getProjects.sql'
import { connection } from '..'

const count = 2

export default async function handleProjects(req: NextApiRequest, res: NextApiResponse) {
  // Get project
  if (req.method === 'GET') {
    const { page } = req.query
    if (!page) return res.status(400).send({ message: 'Please check your inputs of request' })

    try {
      const [rows] = await (await connection).query(getProjects, [+page * count + 1, count]) // 첫번째 프로젝트 = 현재 프로젝트
      console.log('👀 - rows', rows)
      return res.status(200).json({ projects: rows })
    } catch (error) {
      return res.status(500).send({ message: '500: 데이터베이스 쿼리 오류' })
    }
  }

  // Create project
  if (req.method === 'POST') {
    const [rows] = await (await connection).query(createProject, [])
    return res.status(200).json({ rows })
  }

  // Else
  return res.status(405).send({ message: 'Method not allowed' })
}
