import { NextApiRequest, NextApiResponse } from 'next'
import { isEmptyObject } from 'src/utils'

import deleteCommunity from './sql/deleteCommunity.sql'
import getBeforeAndAfterCommunity from './sql/getBeforeAndAfterCommunity.sql'
import getCommunity from './sql/getCommunity.sql'
import updateCommunity from './sql/updateCommunity.sql'
import { connection } from '..'

export default async function handleCommunity(req: NextApiRequest, res: NextApiResponse) {
  // Get community
  if (req.method === 'GET') {
    const communityId = req.query.id

    const [rows, rows2] = await Promise.all([
      (await connection).query(getCommunity, [communityId]),
      (await connection).query(getBeforeAndAfterCommunity, [communityId, communityId]),
    ])

    const communities = rows2[0] as any

    return res.status(200).json({
      nextCommunity: communities[1]
        ? communities[1].id > communityId
          ? communities[1]
          : null
        : communities[0].id > communityId
        ? communities[0]
        : null,
      community: (rows[0] as any)[0],
      previousCommunity: communities[0]?.id < communityId ? communities[0] : null,
    })
  }

  // Update community
  if (req.method === 'PUT') {
    if (isEmptyObject(req.body)) return res.status(400).send({ message: '값을 입력해주세요.' })

    await (
      await connection
    ).query(updateCommunity, [req.body.description, req.body.detail, req.query.id])
    return res.status(200).send({ message: 'Update complete' })
  }

  // Delete community
  if (req.method === 'DELETE') {
    const [rows] = await (await connection).query(deleteCommunity, [req.query.id])
    return res.status(200).json({ rows })
  }

  // Else
  return res.status(405).send({ message: 'Method not allowed' })
}
