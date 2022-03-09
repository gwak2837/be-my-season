import { NextApiRequest, NextApiResponse } from 'next'
import { isEmptyObject } from 'src/utils'

import getFAQs from './sql/getFAQs.sql'
import getFAQsByCategory from './sql/getFAQsByCategory.sql'
import createFAQ from './sql/createFAQ.sql'
import { pool } from '..'
import { verifyJWT } from 'src/utils/jwt'

export default async function handleFAQ(req: NextApiRequest, res: NextApiResponse) {
  // Get FAQs
  if (req.method === 'GET') {
    const { page, category } = req.query
    // if (!page) return res.status(400).send('Please check your input of request')

    try {
      if (category) {
        const [rows] = await pool.query(getFAQsByCategory, [+category])
        return res.status(200).json(rows)
      } else {
        const [rows] = await pool.query(getFAQs)
        return res.status(200).json(rows)
      }
    } catch (error) {
      return res.status(500).send('500: Database query error')
    }
  }

  // Create FAQ
  if (req.method === 'POST') {
    const jwt = req.headers.authorization
    if (!jwt) return res.status(401).send('Need to authenticate')

    const verifiedJwt = await verifyJWT(jwt).catch(() => null)
    if (!verifiedJwt) return res.status(400).send('Invalid JWT')
    if (!verifiedJwt.isAdmin) return res.status(403).send('Need administrator rights')

    const { category, title, description } = req.body
    if (!category || !title || !description)
      return res.status(400).send('Please check your inputs of request')

    const [rows] = await pool.query(createFAQ, [category, title, description])
    return res.status(200).json(rows)
  }

  // Else
  return res.status(405).send('Method not allowed')
}
