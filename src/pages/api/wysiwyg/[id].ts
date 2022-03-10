import { NextApiRequest, NextApiResponse } from 'next'
import { isEmptyObject } from 'src/utils'
import { verifyJWT } from 'src/utils/jwt'

import deleteWysiwyg from './sql/deleteWysiwyg.sql'
import getWysiwyg from './sql/getWysiwyg.sql'
import updateWysiwyg from './sql/updateWysiwyg.sql'
import { pool } from '..'

export default async function handleWysiwyg(req: NextApiRequest, res: NextApiResponse) {
  // Get wysiwyg
  if (req.method === 'GET') {
    const [rows] = await pool.query(getWysiwyg, [req.query.id])
    return res.status(200).json((rows as any)[0])
  }

  // Update wysiwyg
  if (req.method === 'PUT') {
    const jwt = req.headers.authorization
    if (!jwt) return res.status(401).send('Need to authenticate')

    const verifiedJwt = await verifyJWT(jwt).catch(() => null)
    if (!verifiedJwt) return res.status(400).send('Invalid JWT')
    if (!verifiedJwt.isAdmin) return res.status(403).send('Require administrator privileges')

    const { contents } = req.body
    if (!contents) return res.status(400).send('Please check your inputs of request')

    const [rows] = await pool.query(updateWysiwyg, [contents, req.query.id])
    return res.status(200).json({ rows })
  }

  // Delete wysiwyg
  if (req.method === 'DELETE') {
    const jwt = req.headers.authorization
    if (!jwt) return res.status(401).send('Need to authenticate')

    const verifiedJwt = await verifyJWT(jwt).catch(() => null)
    if (!verifiedJwt) return res.status(400).send('Invalid JWT')
    if (!verifiedJwt.isAdmin) return res.status(403).send('Require administrator privileges')

    const [rows] = await pool.query(deleteWysiwyg, [req.query.id])
    return res.status(200).json({ rows })
  }

  // Else
  return res.status(405).send('Method not allowed')
}
