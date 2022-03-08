import type { NextApiRequest, NextApiResponse } from 'next'

import getAboutUs from './sql/getAboutUs.sql'
import { pool } from '..'

export default async function handleIntroduceAboutUs(_: NextApiRequest, res: NextApiResponse) {
  const [rows] = await pool.query(getAboutUs)
  res.status(200).json({ aboutUs: (rows as any)[0].contents })
}
