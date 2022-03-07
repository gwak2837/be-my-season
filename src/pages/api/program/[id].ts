import { NextApiRequest, NextApiResponse } from 'next'
import { isEmptyObject } from 'src/utils'

import deleteProgram from './sql/deleteProgram.sql'
import getBeforeAndAfterProgram from './sql/getBeforeAndAfterProgram.sql'
import getProgram from './sql/getProgram.sql'
import updateProgram from './sql/updateProgram.sql'
import { connection } from '..'

export default async function handleProgram(req: NextApiRequest, res: NextApiResponse) {
  // Get program
  if (req.method === 'GET') {
    const programId = req.query.id

    const [rows, rows2] = await Promise.all([
      (await connection).query(getProgram, [programId]),
      (await connection).query(getBeforeAndAfterProgram, [programId, programId]),
    ])

    const programs = rows2[0] as any

    return res.status(200).json({
      nextProgram: programs[1]
        ? programs[1].id > programId
          ? programs[1]
          : null
        : programs[0].id > programId
        ? programs[0]
        : null,
      program: (rows[0] as any)[0],
      previousProgram: programs[0]?.id < programId ? programs[0] : null,
    })
  }

  // Update program
  if (req.method === 'PUT') {
    if (isEmptyObject(req.body)) return res.status(400).send({ message: '값을 입력해주세요.' })

    await (await connection).query(updateProgram, [req.body.program, req.query.id])
    return res.status(200).send({ message: 'Update complete' })
  }

  // Delete program
  if (req.method === 'DELETE') {
    const [rows] = await (await connection).query(deleteProgram, [req.query.id])
    return res.status(200).json({ rows })
  }

  // Else
  return res.status(405).send({ message: 'Method not allowed' })
}
