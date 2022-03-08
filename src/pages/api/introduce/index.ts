import type { NextApiRequest, NextApiResponse } from 'next'

import getBrandStory from './sql/getBrandStory.sql'
import { pool } from '..'

export default async function handleIntroduceBrandStory(_: NextApiRequest, res: NextApiResponse) {
  const [rows] = await pool.query(getBrandStory)
  res.status(200).json({ brandStory: (rows as any)[0].contents })
}
