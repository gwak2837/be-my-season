import { NextApiRequest, NextApiResponse } from 'next'
import { isEmptyObject } from 'src/utils'
import { verifyJWT } from 'src/utils/jwt'

import { pool } from '../..'
import deleteJoinedProgram from './sql/deleteJoinedProgram.sql'
import getJoinedProgram from './sql/getJoinedProgram.sql'
import joinProgram from './sql/joinProgram.sql'

export default async function handleJoiningProgram(req: NextApiRequest, res: NextApiResponse) {
  const jwt = req.headers.authorization
  if (!jwt) return res.status(401).send('Need to authenticate')

  const verifiedJwt = await verifyJWT(jwt).catch(() => null)
  if (!verifiedJwt) return res.status(400).send('Invalid JWT')

  // Get
  if (req.method === 'GET') {
    const [rows] = await pool.query(getJoinedProgram, [verifiedJwt.userId])
    return res.status(200).json({ joinedProgram: (rows as any)[0] })
  }

  // Insert
  if (req.method === 'POST') {
    await pool.query(joinProgram, [verifiedJwt.userId, req.query.id])

    return res.status(200).json({ message: 'Joining the program completed' })
  }

  // Delete
  if (req.method === 'DELETE') {
    const [resultHeader] = await pool.query(deleteJoinedProgram, [verifiedJwt.userId, req.query.id])
    if ((resultHeader as any).affectedRows === 0)
      return res.status(400).send('There is no such thing, or you do not have permission to delete')

    return res.status(200).json({ message: 'Disjoining the program completed' })
  }

  // Else
  return res.status(405).send('Method not allowed')
}
