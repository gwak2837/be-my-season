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
      nextProgram: programs[1]
        ? programs[1].id > programId
          ? programs[1]
          : null
        : programs[0].id > programId
        ? programs[0]
        : null,
      previousProgram: programs[0]?.id < programId ? programs[0] : null,
    })
  }

  // Update program
  else if (req.method === 'PUT') {
    const jwt = req.headers.authorization
    if (!jwt) return res.status(401).send('Need to authenticate')

    const verifiedJwt = await verifyJWT(jwt).catch(() => null)
    if (!verifiedJwt) return res.status(400).send('Invalid JWT')
    if (!verifiedJwt.isAdmin) return res.status(403).send('Require administrator privileges')

    const { title, price, description, detail, imageUrl, type } = req.body
    console.log(
      '👀 - title, price, description, detail, imageUrl, type',
      title,
      price,
      description,
      detail,
      imageUrl,
      type
    )
    if (!title || price === undefined || !description || !detail || type === undefined)
      return res.status(400).send('Please check your inputs of request')

    const [resultHeader] = await pool.query(updateProgram, [
      title,
      price,
      description,
      detail,
      imageUrl,
      type,
      req.query.id,
    ])
    if ((resultHeader as any).affectedRows === 0)
      return res
        .status(400)
        .send('There is no such program, or you do not have permission to delete the program')

    return res.status(200).json({ message: 'Update complete' })
  }

  // Delete program
  else if (req.method === 'DELETE') {
    const jwt = req.headers.authorization
    if (!jwt) return res.status(401).send('Need to authenticate')

    const verifiedJwt = await verifyJWT(jwt).catch(() => null)
    if (!verifiedJwt) return res.status(400).send('Invalid JWT')
    if (!verifiedJwt.isAdmin) return res.status(403).send('Require administrator privileges')

    const [resultHeader] = await pool.query(deleteProgram, [req.query.id])
    if ((resultHeader as any).affectedRows === 0)
      return res
        .status(400)
        .send('There is no such program, or you do not have permission to delete the program')

    return res.status(200).json({ message: 'Deletion complete' })
  }

  // Else
  return res.status(405).send('Method not allowed')
}
