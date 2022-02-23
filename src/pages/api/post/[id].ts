import { NextApiRequest, NextApiResponse } from 'next'

import { connection } from '..'

type Data = {
  results: any
}

const sql = 'SELECT * FROM post WHERE id = ?'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  ;(await connection).query(sql, [req.query.id], (error, results) => {
    if (error) throw error
    res.status(200).json({ results })
  })
}
