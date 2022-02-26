import mysql, { Connection } from 'mysql2/promise'
import type { NextApiRequest, NextApiResponse } from 'next'
import tunnel from 'tunnel-ssh'

export const connection = new Promise<Connection>((resolve, reject) => {
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
        resolve(
          mysql.createConnection({
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
          })
        )
      }
    }
  )
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const [rows] = await (await connection).query('SELECT NOW()')
  res.status(200).json({ rows })
}
