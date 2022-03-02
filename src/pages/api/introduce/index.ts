import type { NextApiRequest, NextApiResponse } from 'next'

import { connection } from '..'
import getBrandStory from './sql/getBrandStory.sql'

export default async function handleIntroduceBrandStory(_: NextApiRequest, res: NextApiResponse) {
  const [rows] = await (await connection).query(getBrandStory)
  res.status(200).json({ brandStory: (rows as any)[0].contents })
}
