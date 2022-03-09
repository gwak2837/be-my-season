import { NextApiRequest, NextApiResponse } from 'next'
import { isEmptyObject } from 'src/utils'
import { verifyJWT } from 'src/utils/jwt'

import { pool } from '../..'
import createCommunityReview from './sql/createCommunityReview.sql'
import deleteCommunityReview from './sql/deleteCommunityReview.sql'
import getCommunityReviews from './sql/getCommunityReviews.sql'
import updateCommunityReview from './sql/updateCommunityReview.sql'

export default async function handleCommunityReview(req: NextApiRequest, res: NextApiResponse) {
  // Get community reviews
  if (req.method === 'GET') {
    const [rows] = await pool.query(getCommunityReviews, [req.query.id])
    return res.status(200).json(rows)
  }

  // Create community review
  else if (req.method === 'POST') {
    const jwt = req.headers.authorization
    if (!jwt) return res.status(401).send('Need to authenticate')

    const verifiedJwt = await verifyJWT(jwt).catch(() => null)
    if (!verifiedJwt) return res.status(400).send('Invalid JWT')

    const { title, description, point } = req.body
    if (!title || !description || !point) return res.status(400).send('값을 입력해주세요.')

    await pool.query(createCommunityReview, [
      title,
      description,
      point,
      req.query.id,
      verifiedJwt.userId,
    ])
    return res.status(200).json('Modifications completed')
  }

  // Update community review
  else if (req.method === 'PUT') {
    const jwt = req.headers.authorization
    if (!jwt) return res.status(401).send('Need to authenticate')

    const verifiedJwt = await verifyJWT(jwt).catch(() => null)
    if (!verifiedJwt) return res.status(400).send('Invalid JWT')

    const { reviewId, title, description, point } = req.body
    if (!reviewId) return res.status(400).send('값을 입력해주세요.')

    await pool.query(updateCommunityReview, [
      title,
      description,
      point,
      reviewId,
      verifiedJwt.userId,
    ])
    return res.status(200).json('Delete completed')
  }

  // Delete community review
  else if (req.method === 'DELETE') {
    const jwt = req.headers.authorization
    if (!jwt) return res.status(401).send('Need to authenticate')

    const verifiedJwt = await verifyJWT(jwt).catch(() => null)
    if (!verifiedJwt) return res.status(400).send('Invalid JWT')

    const reviewId = req.query.reviewId
    if (!reviewId) return res.status(400).send({ message: '값을 입력해주세요.' })

    await pool.query(deleteCommunityReview, [reviewId, verifiedJwt.userId])
    return res.status(200).json('Delete completed')
  }

  // Else
  return res.status(405).send('Method not allowed')
}
