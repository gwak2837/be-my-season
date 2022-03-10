import { NextApiRequest, NextApiResponse } from 'next'
import { isEmptyObject } from 'src/utils'
import { verifyJWT } from 'src/utils/jwt'

import { pool } from '../..'
import deleteJoinedCommunity from './sql/deleteJoinedCommunity.sql'
import getJoinedCommunity from './sql/getJoinedCommunity.sql'
import joinCommunity from './sql/joinCommunity.sql'

export default async function handleJoiningCommunity(req: NextApiRequest, res: NextApiResponse) {
  const jwt = req.headers.authorization
  if (!jwt) return res.status(401).send('Need to authenticate')

  const verifiedJwt = await verifyJWT(jwt).catch(() => null)
  if (!verifiedJwt) return res.status(400).send('Invalid JWT')

  // Get
  if (req.method === 'GET') {
    const [rows] = await pool.query(getJoinedCommunity, [verifiedJwt.userId])
    return res.status(200).json({ joinedCommunity: (rows as any)[0] })
  }

  // Insert
  if (req.method === 'POST') {
    await pool.query(joinCommunity, [verifiedJwt.userId, req.query.id])
    return res.status(200).json({ message: 'Joining the community completed' })
  }

  // Delete
  if (req.method === 'DELETE') {
    await pool.query(deleteJoinedCommunity, [verifiedJwt.userId, req.query.id])
    return res.status(200).json({ message: 'Disjoining the community completed' })
  }

  // Else
  return res.status(405).send('Method not allowed')
}
