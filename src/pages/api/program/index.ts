import type { NextApiRequest, NextApiResponse } from 'next'

import createProgram from './sql/createProgram.sql'
import getPrograms from './sql/getPrograms.sql'
import getProgramsByType from './sql/getProgramsByType.sql'
import { pool } from '..'

const count = 2

export default async function handleProgram(req: NextApiRequest, res: NextApiResponse) {
  // Get programs
  if (req.method === 'GET') {
    const { page, type } = req.query
    if (!page) return res.status(400).send({ message: 'Please check your input of request' })

    try {
      if (type) {
        const [rows] = await pool.query(getProgramsByType, [+type, +page * count, count])
        return res.status(200).json({ programs: rows })
      } else {
        const [rows] = await pool.query(getPrograms, [+page * count, count])
        return res.status(200).json({ programs: rows })
      }
    } catch (error) {
      return res.status(500).send({ message: '500: 데이터베이스 쿼리 오류' })
    }
  }

  // Create program
  if (req.method === 'POST') {
    const [rows] = await pool.query(createProgram, [])
    return res.status(200).json({ rows })
  }

  // Else
  return res.status(405).send({ message: 'Method not allowed' })
}
