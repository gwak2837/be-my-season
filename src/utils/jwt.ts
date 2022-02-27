import { JwtPayload, sign, verify } from 'jsonwebtoken'

export const secretKey = process.env.JWT_SECRET_KEY as string
if (!secretKey) throw new Error('`JWT_SECRET_KEY` 환경 변수를 설정해주세요.')

export function generateJWT<T extends Record<string, unknown>>(payload: T, expiresIn = '3d') {
  return new Promise<string>((resolve, reject) => {
    sign(payload, secretKey, { expiresIn }, (err, token) => {
      if (err) {
        reject(err)
      }
      resolve(token as string)
    })
  })
}

export function verifyJWT<T>(token: string) {
  return new Promise<T & JwtPayload>((resolve, reject) => {
    verify(token, secretKey, { algorithms: ['HS256'] }, (err, decoded) => {
      // JWT가 아니거나, JWT 서명이 유효하지 않거나, JWT 유효기간이 만료됐을 때
      if (err) reject(err)

      resolve(decoded as T & JwtPayload)
    })
  })
}
