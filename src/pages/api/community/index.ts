import type { NextApiRequest, NextApiResponse } from 'next'

import createCommunity from './sql/createCommunity.sql'
import getCommunities from './sql/getCommunities.sql'
import getCommunitiesByType from './sql/getCommunitiesByType.sql'
import { pool } from '..'

const count = 2

export default async function handleCommunity(req: NextApiRequest, res: NextApiResponse) {
  // Get communities
  if (req.method === 'GET') {
    const { page, type } = req.query
    if (!page) return res.status(400).send({ message: 'Please check your input of request' })

    try {
      if (type) {
        const [rows] = await pool.query(getCommunitiesByType, [+type, +page * count, count])
        return res.status(200).json({ communities: rows })
      } else {
        const [rows] = await pool.query(getCommunities, [+page * count, count])
        return res.status(200).json({ communities: rows })
      }
    } catch (error) {
      return res.status(500).send('500: Database query error')
    }
  }

  // Create community
  if (req.method === 'POST') {
    const [rows] = await pool.query(createCommunity, [])
    return res.status(200).json({ rows })
  }

  // Else
  return res.status(405).send('Method not allowed')
}
