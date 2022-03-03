import type { NextApiRequest, NextApiResponse } from 'next'

import isEmailUnique from './sql/isEmailUnique.sql'
import isLoginIdUnique from './sql/isLoginIdUnique.sql'
import isPhoneNumberUnique from './sql/isPhoneNumberUnique.sql'
import { connection } from '..'

export default async function handleCheckingEmailIsUnique(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') return res.status(405).send({ message: 'Method not allowed' })

  const { loginId, email, phoneNumber } = req.query
  if (!loginId && !email && !phoneNumber)
    return res.status(400).send({ message: '입력값을 입력해주세요' })

  // Login id
  if (loginId) {
    const [rows] = await (await connection).query(isLoginIdUnique, [loginId])
    if ((rows as any).length === 0) {
      return res.status(200).send(1)
    } else {
      return res.status(400).send(0)
    }
  }

  // Email
  else if (email) {
    const [rows] = await (await connection).query(isEmailUnique, [email])
    if ((rows as any).length === 0) {
      return res.status(200).send(1)
    } else {
      return res.status(400).send(0)
    }
  }

  // Phone number
  else if (phoneNumber) {
    const [rows] = await (await connection).query(isPhoneNumberUnique, [phoneNumber])
    if ((rows as any).length === 0) {
      return res.status(200).send(1)
    } else {
      return res.status(400).send(0)
    }
  }
}
