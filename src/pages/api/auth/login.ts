import { compare } from 'bcryptjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { generateJWT } from 'src/utils/jwt'

import getPasswordByLoginId from './sql/getPasswordByLoginId.sql'
import { connection } from '..'

export default async function handleLogin(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send({ message: 'Only POST requests allowed' })

  if (req.headers.authorization)
    return res.status(403).send({ message: '이미 로그인되어 있습니다. 로그아웃 후 시도해주세요.' })

  const { loginId, password } = req.body
  if (!loginId || !password)
    return res.status(400).send({ message: '아이디 또는 비밀번호를 입력해주세요.' })

  const [rows] = await (await connection).query(getPasswordByLoginId, [loginId])
  if ((rows as any).length === 0)
    return res
      .status(401)
      .send({ message: '로그인에 실패했어요. 아이디 또는 비밀번호를 확인해주세요.' })

  const authenticationSuceed = await compare(password, (rows as any)[0].password_hash)
  if (!authenticationSuceed)
    return res
      .status(401)
      .send({ message: '로그인에 실패했어요. 아이디 또는 비밀번호를 확인해주세요.' })

  return { jwt: await generateJWT({ userId: (rows as any)[0].id }) }
}
