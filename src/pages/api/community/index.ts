import type { NextApiRequest, NextApiResponse } from 'next'

import createCommunity from './sql/createCommunity.sql'
import getCommunities from './sql/getCommunities.sql'
import getCommunitiesByType from './sql/getCommunitiesByType.sql'
import { connection } from '..'

const count = 2

export default async function handleCommunity(req: NextApiRequest, res: NextApiResponse) {
  // Get communities
  if (req.method === 'GET') {
    const { page, type } = req.query
    if (!page) return res.status(400).send({ message: 'Please check your input of request' })

    try {
      if (type) {
        const [rows] = await (
          await connection
        ).query(getCommunitiesByType, [+type, +page * count, count])
        return res.status(200).json({ communities: rows })
      } else {
        const [rows] = await (await connection).query(getCommunities, [+page * count, count])
        return res.status(200).json({ communities: rows })
      }
    } catch (error) {
      return res.status(500).send({ message: '500: 데이터베이스 쿼리 오류' })
    }
  }

  // Create community
  if (req.method === 'POST') {
    const [rows] = await (await connection).query(createCommunity, [])
    return res.status(200).json({ rows })
  }

  // Else
  return res.status(405).send({ message: 'Method not allowed' })
}
