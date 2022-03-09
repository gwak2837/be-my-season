import { genSalt, hash } from 'bcryptjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { emailRegEx } from 'src/utils'
import { generateJWT, verifyJWT } from 'src/utils/jwt'

import getKakaoId from './sql/getKakaoId.sql'
import getMe from './sql/getMe.sql'
import register from './sql/register.sql'
import unregister from './sql/unregister.sql'
import updateMe from './sql/updateMe.sql'
import { pool } from '..'

export default async function handleUser(req: NextApiRequest, res: NextApiResponse) {
  const jwt = req.headers.authorization

  // Get me
  if (req.method === 'GET') {
    const jwt = req.headers.authorization
    if (!jwt) return res.status(200).json({})

    const verifiedJwt = await verifyJWT(jwt).catch(() => null)
    if (!verifiedJwt) return res.status(400).send('Invalid JWT')

    // 내 정보
    const [rows] = await pool.query(getMe, [verifiedJwt.userId])

    return res.status(200)
  }

  // Register
  else if (req.method === 'POST') {
    if (jwt)
      return res
        .status(403)
        .send({ message: '이미 로그인되어 있습니다. 로그아웃 후 시도해주세요.' })

    const {
      nickname,
      profileImageUrl,
      email,
      sex,
      birthyear,
      birthday,
      phoneNumber,
      loginId,
      password,
    } = req.body

    if (
      !nickname ||
      !email ||
      !sex ||
      !birthyear ||
      !birthday ||
      !phoneNumber ||
      !loginId ||
      !password
    )
      return res.status(400).send({ message: '필수 입력값을 입력해주세요.' })

    if (!emailRegEx.test(email))
      return res.status(400).send({ message: '이메일 형식을 확인해주세요.' })

    const passwordHashWithSalt = await hash(password, await genSalt())

    try {
      const [newUserHeader] = await pool.query(register, [
        nickname,
        profileImageUrl,
        email,
        sex,
        birthyear,
        birthday,
        phoneNumber,
        loginId,
        passwordHashWithSalt,
      ])
      return res
        .status(200)
        .json({ jwt: await generateJWT({ userId: (newUserHeader as any).insertId }) })
    } catch (error) {
      return res.status(500).send({ message: '500: 데이터베이스 쿼리 오류' })
    }
  }

  // Update me
  else if (req.method === 'PUT') {
    if (!jwt)
      return res.status(401).send({ message: '로그인되어 있지 않습니다. 로그인 후 시도해주세요.' })

    const verifiedJwt = await verifyJWT(jwt).catch(() => null)
    if (!verifiedJwt) return res.status(400).send({ message: 'Invalid JWT' })

    const [rows] = await pool.query(updateMe, [verifiedJwt.userId])

    return res.status(200)
  }

  // Unregister
  else if (req.method === 'DELETE') {
    if (!jwt)
      return res.status(401).send({ message: '로그인되어 있지 않습니다. 로그인 후 시도해주세요.' })

    const verifiedJwt = await verifyJWT(jwt).catch(() => null)
    if (!verifiedJwt) return res.status(400).send({ message: 'Invalid JWT' })

    const [rows] = await pool.query(getKakaoId, [verifiedJwt.userId])

    await Promise.all([
      pool.query(unregister, [verifiedJwt.userId]),
      unregisterKakaoUser((rows as any)[0].kakao_id),
    ])

    return res.status(200).json({ message: '비마이시즌 서비스 탈퇴에 성공했습니다.' })
  }

  // Else
  return res.status(405).send({ message: 'Method not allowed' })
}

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
