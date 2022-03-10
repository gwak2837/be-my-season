import { NextApiRequest, NextApiResponse } from 'next'
import { isEmptyObject } from 'src/utils'
import { verifyJWT } from 'src/utils/jwt'

import { pool } from '../..'
import createProgramQnA from './sql/createProgramQnA.sql'
import deleteProgramQnA from './sql/deleteProgramQnA.sql'
import getProgramQnAs from './sql/getProgramQnAs.sql'
import updateProgramQnA from './sql/updateProgramQnA.sql'

export default async function handleProgramQnA(req: NextApiRequest, res: NextApiResponse) {
  // Get program QnA
  if (req.method === 'GET') {
    const [rows] = await pool.query(getProgramQnAs, [req.query.id])
    return res.status(200).json(rows)
  }

  // Create program QnA
  else if (req.method === 'POST') {
    const jwt = req.headers.authorization
    if (!jwt) return res.status(401).send('Need to authenticate')

    const verifiedJwt = await verifyJWT(jwt).catch(() => null)
    if (!verifiedJwt) return res.status(400).send('Invalid JWT')

    if (isEmptyObject(req.body)) return res.status(400).send('Please check your inputs of request')

    await pool.query(createProgramQnA, [
      req.body.title,
      req.body.description,
      req.query.id,
      verifiedJwt.userId,
    ])
    return res.status(200).json({ message: 'Modifications completed' })
  }

  // Update program QnA
  else if (req.method === 'PUT') {
    const jwt = req.headers.authorization
    if (!jwt) return res.status(401).send('Need to authenticate')

    const verifiedJwt = await verifyJWT(jwt).catch(() => null)
    if (!verifiedJwt) return res.status(400).send('Invalid JWT')

    const { qnaId, title, description } = req.body
    if (!qnaId) return res.status(400).send('Please check your inputs of request')

    await pool.query(updateProgramQnA, [title, description, qnaId, verifiedJwt.userId])
    return res.status(200).json({ message: 'Delete completed' })
  }

  // Delete program QnA
  else if (req.method === 'DELETE') {
    const jwt = req.headers.authorization
    if (!jwt) return res.status(401).send('Need to authenticate')

    const verifiedJwt = await verifyJWT(jwt).catch(() => null)
    if (!verifiedJwt) return res.status(400).send('Invalid JWT')

    const qnaId = req.query.qnaId
    if (!qnaId) return res.status(400).send('Please check your inputs of request')

    await pool.query(deleteProgramQnA, [qnaId, verifiedJwt.userId])
    return res.status(200).json({ message: 'Delete completed' })
  }

  // Else
  return res.status(405).send('Method not allowed')
}
