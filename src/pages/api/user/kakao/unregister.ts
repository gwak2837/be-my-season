import type { NextApiRequest, NextApiResponse } from 'next'

import { connection } from '../..'
import unregisterByKakaoId from './sql/unregisterByKakaoId.sql'

export default async function handleKakaoUnregister(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).send({ message: 'Only GET requests allowed' })

  const { user_id, referrer_type } = req.query
  if (!user_id || !referrer_type)
    return res.status(400).send({ message: '필수 입력값을 입력해주세요.' })

  if (req.headers.authorization !== `KakaoAK ${process.env.KAKAO_ADMIN_KEY}`)
    return res.status(403).send({ message: '접근 권한이 없습니다.' })

  await (await connection).query(unregisterByKakaoId, [user_id])

  return res.status(200).send({ message: '비마이시즌 서비스 탈퇴에 성공했습니다.' })
}
