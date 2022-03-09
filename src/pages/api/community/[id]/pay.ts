import { NextApiRequest, NextApiResponse } from 'next'
import { isEmptyObject } from 'src/utils'

import deletePay from './sql/deletePay.sql'
import getPay from './sql/getPay.sql'
import updatePay from './sql/updatePay.sql'

export default async function handlePayingCommunity(req: NextApiRequest, res: NextApiResponse) {
  // Create paying community
  if (req.method === 'POST') {
    return res.status(501).send('Not implemented')
  }

  // Else
  return res.status(405).send('Method not allowed')
}
