import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyJWT } from 'src/utils/jwt'

import createProgram from './sql/createProgram.sql'
import getPrograms from './sql/getPrograms.sql'
import getProgramsByStatus from './sql/getProgramsByStatus.sql'
import getProgramsByType from './sql/getProgramsByType.sql'
import { pool } from '..'

const count = 12

export default async function handleProgram(req: NextApiRequest, res: NextApiResponse) {
  // Get programs
  if (req.method === 'GET') {
    const { page, type, status } = req.query
    if (!page) return res.status(400).send('Please check your input of request')

    try {
      if (type) {
        const [rows] = await pool.query(getProgramsByType, [+type, +page * count, count])
        return res.status(200).json(rows)
      } else if (status) {
        const [rows] = await pool.query(getProgramsByStatus, [+status, +page * count, count])
        return res.status(200).json(rows)
      } else {
        const [rows] = await pool.query(getPrograms, [+page * count, count])
        return res.status(200).json(rows)
      }
    } catch (error) {
      return res.status(500).send('500: Database query error')
    }
  }

  // Create program
  if (req.method === 'POST') {
    const jwt = req.headers.authorization
    if (!jwt) return res.status(401).send('Need to authenticate')

    const verifiedJwt = await verifyJWT(jwt).catch(() => null)
    if (!verifiedJwt) return res.status(400).send('Invalid JWT')
    if (!verifiedJwt.isAdmin) return res.status(403).send('Require administrator privileges')

    const { title, price, description, detail, imageUrl, type } = req.body
    if (!title || price === undefined || !description || !detail || type === undefined)
      return res.status(400).send('Please check your inputs of request')

    const [rows] = await pool.query(createProgram, [
      title,
      price,
      description,
      detail,
      imageUrl,
      type,
      verifiedJwt.userId,
    ])
    return res.status(200).json({ rows })
  }

  // Else
  return res.status(405).send('Method not allowed')
}
