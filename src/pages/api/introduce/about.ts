import type { NextApiRequest, NextApiResponse } from 'next'

import { connection } from '..'
import getAboutUs from './sql/getAboutUs.sql'

export default async function handleIntroduceAboutUs(_: NextApiRequest, res: NextApiResponse) {
  const [rows] = await (await connection).query(getAboutUs)
  res.status(200).json({ aboutUs: (rows as any)[0].contents })
}
