import { genSalt, hash } from 'bcryptjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { emailRegEx } from 'src/utils'
import { generateJWT } from 'src/utils/jwt'

import registerUser from './sql/registerUser.sql'
import { connection } from '..'

export default async function handleRegister(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send({ message: 'Only POST requests allowed' })

  if (req.headers.authorization)
    return res.status(403).send({ message: '이미 로그인되어 있습니다. 로그아웃 후 시도해주세요.' })

  const { nickname, email, gender, birthyear, birthday, phoneNumber, loginId, password } = req.body
  if (
    !nickname ||
    !email ||
    !gender ||
    !birthyear ||
    !birthday ||
    !phoneNumber ||
    !loginId ||
    !password
  )
    return res.status(400).send({ message: '필수 입력값을 입력해주세요.' })

  if (emailRegEx.test(email))
    return res.status(400).send({ message: '이메일 형식을 확인해주세요.' })

  const passwordHashWithSalt = await hash(password, await genSalt())

  const [newUserHeader] = await (
    await connection
  ).query(registerUser, [
    nickname,
    email,
    gender,
    birthyear,
    birthday,
    phoneNumber,
    loginId,
    passwordHashWithSalt,
  ])

  return res
    .status(200)
    .json({ jwt: await generateJWT({ userId: (newUserHeader as any).insertId }) })
}
