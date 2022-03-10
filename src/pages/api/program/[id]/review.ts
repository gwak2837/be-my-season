import { NextApiRequest, NextApiResponse } from 'next'
import { isEmptyObject } from 'src/utils'
import { verifyJWT } from 'src/utils/jwt'

import { pool } from '../..'
import createProgramReview from './sql/createProgramReview.sql'
import deleteProgramReview from './sql/deleteProgramReview.sql'
import getProgramReviews from './sql/getProgramReviews.sql'
import updateProgramReview from './sql/updateProgramReview.sql'

export default async function handleProgramReview(req: NextApiRequest, res: NextApiResponse) {
  // Get program reviews
  if (req.method === 'GET') {
    const [rows] = await pool.query(getProgramReviews, [req.query.id])
    return res.status(200).json(rows)
  }

  // Create program review
  else if (req.method === 'POST') {
    const jwt = req.headers.authorization
    if (!jwt) return res.status(401).send('Need to authenticate')

    const verifiedJwt = await verifyJWT(jwt).catch(() => null)
    if (!verifiedJwt) return res.status(400).send('Invalid JWT')

    const { title, description, point } = req.body
    if (!title || !description || !point)
      return res.status(400).send('Please check your inputs of request')

    await pool.query(createProgramReview, [
      title,
      description,
      point,
      req.query.id,
      verifiedJwt.userId,
    ])
    return res.status(200).json('Modifications completed')
  }

  // Update program review
  else if (req.method === 'PUT') {
    const jwt = req.headers.authorization
    if (!jwt) return res.status(401).send('Need to authenticate')

    const verifiedJwt = await verifyJWT(jwt).catch(() => null)
    if (!verifiedJwt) return res.status(400).send('Invalid JWT')

    const { reviewId, title, description, point } = req.body
    if (!reviewId) return res.status(400).send('Please check your inputs of request')

    await pool.query(updateProgramReview, [title, description, point, reviewId, verifiedJwt.userId])
    return res.status(200).json('Delete completed')
  }

  // Delete program review
  else if (req.method === 'DELETE') {
    const jwt = req.headers.authorization
    if (!jwt) return res.status(401).send('Need to authenticate')

    const verifiedJwt = await verifyJWT(jwt).catch(() => null)
    if (!verifiedJwt) return res.status(400).send('Invalid JWT')

    const reviewId = req.query.reviewId
    if (!reviewId) return res.status(400).send('Please check your inputs of request')

    await pool.query(deleteProgramReview, [reviewId, verifiedJwt.userId])
    return res.status(200).json('Delete completed')
  }

  // Else
  return res.status(405).send('Method not allowed')
}
