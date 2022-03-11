import { compare } from 'bcryptjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { generateJWT, verifyJWT } from 'src/utils/jwt'

import getIsAdminFromUser from './sql/getIsAdminFromUser.sql'
import getPasswordByLoginId from './sql/getPasswordByLoginId.sql'
import { pool } from '..'

export default async function handleAuth(req: NextApiRequest, res: NextApiResponse) {
  // Auth
  if (req.method === 'GET') {
    const jwt = req.headers.authorization
    if (!jwt) return res.status(200).json({})

    const verifiedJwt = await verifyJWT(jwt).catch(() => null)
    if (!verifiedJwt) return res.status(400).send('Invalid JWT')

    const [rows] = await pool.query(getIsAdminFromUser, [verifiedJwt.userId])

    return res.status(200).json({
      userId: verifiedJwt.userId,
      isAdmin: Boolean((rows as any)[0].is_admin),
    })
  }

  // Login
  else if (req.method === 'POST') {
    if (req.headers.authorization)
      return res.status(403).send('이미 로그인되어 있습니다. 로그아웃 후 시도해주세요.')

    const { loginId, password } = req.body
    if (!loginId || !password)
      return res.status(400).send('Please input your login id and password')

    const [rows] = await pool.query(getPasswordByLoginId, [loginId])
    if ((rows as any).length === 0)
      return res.status(401).send('Please check your login id and password')

    const authenticationSuceed = await compare(password, (rows as any)[0].password_hash)
    if (!authenticationSuceed)
      return res.status(401).send('Please check your login id and password')

    return res.status(200).json({
      jwt: await generateJWT({
        userId: (rows as any)[0].id,
        isAdmin: Boolean((rows as any)[0].is_admin),
      }),
    })
  }

  // Else
  return res.status(405).send('Method not allowed')
}
