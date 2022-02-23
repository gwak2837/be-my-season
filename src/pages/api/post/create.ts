import { NextApiRequest, NextApiResponse } from 'next'

import { connection } from '..'

type Data = {
  results: any
}

const sql = 'INSERT INTO post (title, contents) VALUES (?, ?)'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const body = req.body

  ;(await connection).query(sql, [body.title, body.contents], (error, results) => {
    if (error) throw error
    res.status(200).json({ results })
  })
}
