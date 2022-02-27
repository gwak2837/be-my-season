import mysql from 'mysql2/promise'
import type { NextApiRequest, NextApiResponse } from 'next'

export const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const [rows] = await (await connection).query('SELECT NOW()')
  res.status(200).json({ rows })
}
