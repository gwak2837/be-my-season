import { NextApiRequest, NextApiResponse } from 'next'
import { isEmptyObject } from 'src/utils'
import { verifyJWT } from 'src/utils/jwt'

import { pool } from '../..'
import deleteFAQ from './sql/deleteFAQ.sql'
import updateFAQ from './sql/updateFAQ.sql'

export default async function handleFAQ(req: NextApiRequest, res: NextApiResponse) {
  const jwt = req.headers.authorization
  if (!jwt) return res.status(401).send('Need to authenticate')

  const verifiedJwt = await verifyJWT(jwt).catch(() => null)
  if (!verifiedJwt) return res.status(400).send('Invalid JWT')
  if (!verifiedJwt.isAdmin) return res.status(403).send('Require administrator privileges')

  // Update FAQ
  if (req.method === 'PUT') {
    const jwt = req.headers.authorization
    if (!jwt) return res.status(401).send('Need to authenticate')

    const verifiedJwt = await verifyJWT(jwt).catch(() => null)
    if (!verifiedJwt) return res.status(400).send('Invalid JWT')
    if (!verifiedJwt.isAdmin) return res.status(403).send('Require administrator privileges')

    const { category, title, description } = req.body
    if (category === undefined || !title || !description)
      return res.status(400).send('Please check your inputs of request')

    await pool.query(updateFAQ, [category, title, description, req.query.id])
    return res.status(200).json({ message: 'Modifications completed' })
  }

  // Delete FAQ
  else if (req.method === 'DELETE') {
    await pool.query(deleteFAQ, [req.query.id])
    return res.status(200).json({ message: 'Delete completed' })
  }

  // Else
  return res.status(405).send('Method not allowed')
}
