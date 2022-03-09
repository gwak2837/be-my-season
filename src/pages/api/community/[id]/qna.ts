import { NextApiRequest, NextApiResponse } from 'next'
import { isEmptyObject } from 'src/utils'
import { verifyJWT } from 'src/utils/jwt'

import { pool } from '../..'
import createCommunityQnA from './sql/createCommunityQnA.sql'
import deleteCommunityQnA from './sql/deleteCommunityQnA.sql'
import getCommunityQnAs from './sql/getCommunityQnAs.sql'
import updateCommunityQnA from './sql/updateCommunityQnA.sql'

export default async function handleCommunityQnA(req: NextApiRequest, res: NextApiResponse) {
  // Get community QnA
  if (req.method === 'GET') {
    const [rows] = await pool.query(getCommunityQnAs, [req.query.id])
    return res.status(200).json(rows)
  }

  // Create community QnA
  else if (req.method === 'POST') {
    const jwt = req.headers.authorization
    if (!jwt) return res.status(401).send('Need to authenticate')

    const verifiedJwt = await verifyJWT(jwt).catch(() => null)
    if (!verifiedJwt) return res.status(400).send('Invalid JWT')

    if (isEmptyObject(req.body)) return res.status(400).send({ message: '값을 입력해주세요.' })

    await pool.query(createCommunityQnA, [
      req.body.title,
      req.body.description,
      req.query.id,
      verifiedJwt.userId,
    ])
    return res.status(200).json({ message: 'Modifications completed' })
  }

  // Update community QnA
  else if (req.method === 'PUT') {
    const jwt = req.headers.authorization
    if (!jwt) return res.status(401).send('Need to authenticate')

    const verifiedJwt = await verifyJWT(jwt).catch(() => null)
    if (!verifiedJwt) return res.status(400).send('Invalid JWT')

    const { qnaId, title, description } = req.body
    if (!qnaId) return res.status(400).send({ message: '값을 입력해주세요.' })

    await pool.query(updateCommunityQnA, [title, description, qnaId, verifiedJwt.userId])
    return res.status(200).json({ message: 'Delete completed' })
  }

  // Delete community QnA
  else if (req.method === 'DELETE') {
    const jwt = req.headers.authorization
    if (!jwt) return res.status(401).send('Need to authenticate')

    const verifiedJwt = await verifyJWT(jwt).catch(() => null)
    if (!verifiedJwt) return res.status(400).send('Invalid JWT')

    const qnaId = req.query.qnaId
    if (!qnaId) return res.status(400).send({ message: '값을 입력해주세요.' })

    await pool.query(deleteCommunityQnA, [qnaId, verifiedJwt.userId])
    return res.status(200).json({ message: 'Delete completed' })
  }

  // Else
  return res.status(405).send({ message: 'Method not allowed' })
}
