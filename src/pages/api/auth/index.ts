import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyJWT } from 'src/utils/jwt'

import { connection } from '..'

export default async function handleAuth(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Only GET requests allowed' })
    return
  }

  const jwt = req.headers.authorization
  if (!jwt) return res.status(200).send({})

  const verifiedJwt = await verifyJWT(jwt).catch(() => null)
  if (!verifiedJwt) return res.status(400).send('Invalid JWT')

  // const [rows] = await (await connection).query('SELECT NOW()', [verifiedJwt.userId])

  return res.status(200).json({ userId: verifiedJwt.userId })
}
