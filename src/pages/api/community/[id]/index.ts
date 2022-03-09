import { NextApiRequest, NextApiResponse } from 'next'
import { isEmptyObject } from 'src/utils'
import { verifyJWT } from 'src/utils/jwt'

import { pool } from '../..'
import deleteCommunity from './sql/deleteCommunity.sql'
import getBeforeAndAfterCommunity from './sql/getBeforeAndAfterCommunity.sql'
import getCommunity from './sql/getCommunity.sql'
import updateCommunity from './sql/updateCommunity.sql'

export default async function handleCommunity(req: NextApiRequest, res: NextApiResponse) {
  // Get community
  if (req.method === 'GET') {
    const jwt = req.headers.authorization
    let verifiedJwt
    if (jwt) {
      verifiedJwt = await verifyJWT(jwt).catch(() => null)
      if (!verifiedJwt) return res.status(400).send('Invalid JWT')
    }

    const communityId = req.query.id

    const [rows, rows2] = await Promise.all([
      pool.query(getCommunity, [verifiedJwt?.userId ?? 0, communityId]),
      pool.query(getBeforeAndAfterCommunity, [communityId, communityId]),
    ])

    const community = (rows[0] as any)[0]
    const communities = rows2[0] as any

    return res.status(200).json({
      community: {
        id: community.id,
        creationTime: community.creationTime,
        title: community.title,
        description: community.description,
        detail: community.detail,
        price: community.price,
        type: community.type,
        isJoined: Boolean(community.community_id),
      },
      nextCommunity: communities[1]
        ? communities[1].id > communityId
          ? communities[1]
          : null
        : communities[0].id > communityId
        ? communities[0]
        : null,
      previousCommunity: communities[0]?.id < communityId ? communities[0] : null,
    })
  }

  // Update community
  if (req.method === 'PUT') {
    if (isEmptyObject(req.body)) return res.status(400).send({ message: '값을 입력해주세요.' })

    await pool.query(updateCommunity, [req.body.description, req.body.detail, req.query.id])
    return res.status(200).json({ message: 'Update complete' })
  }

  // Delete community
  if (req.method === 'DELETE') {
    const [rows] = await pool.query(deleteCommunity, [req.query.id])
    return res.status(200).json({ rows })
  }

  // Else
  return res.status(405).send({ message: 'Method not allowed' })
}
