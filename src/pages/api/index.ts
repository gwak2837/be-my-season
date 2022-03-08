import mysql from 'mysql2/promise'
import type { NextApiRequest, NextApiResponse } from 'next'

export const mySqlConnectionString = process.env.MYSQL_CONNECTION_STRING as string
if (!mySqlConnectionString) throw new Error('`MYSQL_CONNECTION_STRING` 환경 변수를 설정해주세요.')

export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const [rows] = await pool.query('SELECT NOW()')
  res.status(200).json({ rows })
}
