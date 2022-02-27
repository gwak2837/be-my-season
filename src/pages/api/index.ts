import mysql, { Connection } from 'mysql2/promise'
import type { NextApiRequest, NextApiResponse } from 'next'
import tunnel from 'tunnel-ssh'

export const mySqlConnectionString = process.env.MYSQL_CONNECTION_STRING as string
if (!mySqlConnectionString) throw new Error('`MYSQL_CONNECTION_STRING` 환경 변수를 설정해주세요.')

export const connection = process.env.VERCEL
  ? new Promise<Connection>((resolve, reject) => {
      tunnel(
        {
          username: process.env.SSH_USER,
          password: process.env.SSH_PASSWORD,
          host: process.env.SSH_HOST,
          port: Number(process.env.SSH_PORT),
          dstHost: process.env.MYSQL_HOST,
          dstPort: Number(process.env.MYSQL_PORT),
        },
        (error, server) => {
          if (error) {
            reject(error)
          } else if (server !== null) {
            resolve(mysql.createConnection(mySqlConnectionString))
          }
        }
      )
    })
  : mysql.createConnection(mySqlConnectionString)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const [rows] = await (await connection).query('SELECT NOW()')
  res.status(200).json({ rows })
}
