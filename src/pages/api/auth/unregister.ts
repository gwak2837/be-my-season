import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyJWT } from 'src/utils/jwt'

import getKakaoIdById from './sql/getKakaoIdById.sql'
import unregister from './sql/unregister.sql'
import { connection } from '..'

async function unregisterKakaoUser(kakaoUserId: string) {
  return fetch('https://kapi.kakao.com/v1/user/unlink', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `KakaoAK ${process.env.KAKAO_ADMIN_KEY}`,
    },
    body: `target_id_type=user_id&target_id=${kakaoUserId}`,
  })
}

export default async function handleUnregister(req: NextApiRequest, res: NextApiResponse) {
  const jwt = req.headers.authorization
  if (!jwt)
    return res.status(401).send({ message: '로그인되어 있지 않습니다. 로그인 후 시도해주세요.' })

  const verifiedJwt = await verifyJWT(jwt).catch(() => null)
  if (!verifiedJwt) return res.status(400).send({ message: 'Invalid JWT' })

  const [rows] = await (await connection).query(getKakaoIdById, [verifiedJwt.userId])

  await Promise.all([
    (await connection).query(unregister, [verifiedJwt.userId]),
    unregisterKakaoUser((rows as any)[0].kakao_id),
  ])

  return res.status(200).send({ message: '비마이시즌 서비스 탈퇴에 성공했습니다.' })
}
