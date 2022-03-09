import { NextApiRequest, NextApiResponse } from 'next'
import { isEmptyObject } from 'src/utils'
import { verifyJWT } from 'src/utils/jwt'

import { pool } from '../..'
import deleteProgram from './sql/deleteProgram.sql'
import getBeforeAndAfterProgram from './sql/getBeforeAndAfterProgram.sql'
import getProgram from './sql/getProgram.sql'
import updateProgram from './sql/updateProgram.sql'

export default async function handleProgram(req: NextApiRequest, res: NextApiResponse) {
  // Get program
  if (req.method === 'GET') {
    const jwt = req.headers.authorization
    let verifiedJwt
    if (jwt) {
      verifiedJwt = await verifyJWT(jwt).catch(() => null)
      if (!verifiedJwt) return res.status(400).send('Invalid JWT')
    }

    const programId = req.query.id

    const [rows, rows2] = await Promise.all([
      pool.query(getProgram, [verifiedJwt?.userId ?? 0, programId]),
      pool.query(getBeforeAndAfterProgram, [programId, programId]),
    ])

    const program = (rows[0] as any)[0]
    const programs = rows2[0] as any

    return res.status(200).json({
      nextProgram: programs[1]
        ? programs[1].id > programId
          ? programs[1]
          : null
        : programs[0].id > programId
        ? programs[0]
        : null,
      program: {
        id: program.id,
        creationTime: program.creationTime,
        title: program.title,
        description: program.description,
        detail: program.detail,
        price: program.price,
        type: program.type,
        isJoined: Boolean(program.program_id),
      },
      previousProgram: programs[0]?.id < programId ? programs[0] : null,
    })
  }

  // Update program
  else if (req.method === 'PUT') {
    const jwt = req.headers.authorization
    if (!jwt) return res.status(401).send('Need to authenticate')

    const verifiedJwt = await verifyJWT(jwt).catch(() => null)
    if (!verifiedJwt) return res.status(400).send('Invalid JWT')
    if (!verifiedJwt.isAdmin) return res.status(403).send('Need administrator rights')

    if (isEmptyObject(req.body)) return res.status(400).send({ message: '값을 입력해주세요.' })

    await pool.query(updateProgram, [req.body.description, req.body.detail, req.query.id])
    return res.status(200).send({ message: 'Update complete' })
  }

  // Delete program
  else if (req.method === 'DELETE') {
    const jwt = req.headers.authorization
    if (!jwt) return res.status(401).send('Need to authenticate')

    const verifiedJwt = await verifyJWT(jwt).catch(() => null)
    if (!verifiedJwt) return res.status(400).send('Invalid JWT')
    if (!verifiedJwt.isAdmin) return res.status(403).send('Need administrator rights')

    const [rows] = await pool.query(deleteProgram, [req.query.id])
    return res.status(200).json({ rows })
  }

  // Else
  return res.status(405).send({ message: 'Method not allowed' })
}
