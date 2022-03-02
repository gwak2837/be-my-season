import type { NextApiRequest, NextApiResponse } from 'next'

import { connection } from '..'

export default async function handleCheckingEmailIsUnique(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [rows] = await (await connection).query('SELECT NOW()')
  res.status(200).json({ rows })
}
