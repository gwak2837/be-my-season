import { NextApiRequest, NextApiResponse } from 'next'
import { generateJWT } from 'src/utils/jwt'

import findKakaoUser from './sql/findKakaoUser.sql'
import registerKakaoUser from './sql/registerKakaoUser.sql'
import { connection } from '..'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.query.code) {
    return res.status(400).send('400 Bad Request')
  }

  const kakaoUserToken = await fetchKakaoUserToken(req.query.code as string)
  if (kakaoUserToken.error) {
    return res.status(400).send('400 Bad Request')
  }

  const kakaoUserInfo = await fetchKakaoUserInfo(kakaoUserToken.access_token as string)
  console.log('👀 - kakaoUserInfo', kakaoUserInfo)
  const kakaoAccount = kakaoUserInfo.kakao_account as any
  console.log('👀 - kakaoAccount', kakaoAccount)

  // 선택항목 미동의 시 다른 페이지로 리다이렉트 하기
  // if (!kakaoAccount.birthyear || !kakaoAccount.birthday || !kakaoAccount.gender) {
  //   unregisterKakaoUser(kakaoUserInfo.id as string)
  //   return res.redirect('/need-info')
  // }

  // 4050 여성이 아닌 경우
  // if (!verifyTargetCustomer(kakaoUserInfo)) {
  //   return res.redirect(`/sorry?id=${kakaoUserInfo.id}`)
  // }

  const [kakaoUserRows] = await (await connection).query(findKakaoUser, [kakaoUserInfo.id])
  const kakaoUser = (kakaoUserRows as any)[0]

  // 이미 kakao 소셜 로그인 정보가 존재하는 경우
  if (kakaoUser) {
    const jwt = await generateJWT({ userId: kakaoUser.id })

    // 필수 정보가 없는 경우
    // if (!hasRequiredInfo(kakaoUser)) {
    //   return res.redirect(
    //     `/oauth/register?${new URLSearchParams({
    //       jwt,
    //       nickname: kakaoUser.nickname,
    //       phoneNumber: kakaoUser.phone_number,
    //     })}`
    //   )
    // }

    return res.redirect(`/oauth?${new URLSearchParams({ jwt, nickname: kakaoUser.nickname })}`)
  }

  // kakao 소셜 로그인 정보가 없는 경우
  const [newUserRows] = await (
    await connection
  ).query(registerKakaoUser, [
    kakaoAccount.email,
    kakaoAccount.phone_number,
    kakaoAccount.birthyear,
    kakaoAccount.birthday,
    kakaoAccount.profile.profile_image_url,
    kakaoUserInfo.id,
  ])
  const newKakaoUser = (newUserRows as any)[0]

  const queryString = new URLSearchParams({
    jwt: await generateJWT({ userId: newKakaoUser.id }),
    phoneNumber: newKakaoUser.phone_number,
  })

  return res.redirect(`/oauth/register?${queryString}`)
}

async function fetchKakaoUserToken(code: string) {
  const response = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&code=${code}`,
  })

  return (await response.json()) as Record<string, unknown>
}

async function fetchKakaoUserInfo(accessToken: string) {
  const response = await fetch('https://kapi.kakao.com/v2/user/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return (await response.json()) as Record<string, unknown>
}

// export async function unregisterKakaoUser(kakaoUserId: string) {
//   return fetch('https://kapi.kakao.com/v1/user/unlink', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       Authorization: `KakaoAK ${process.env.KAKAO_ADMIN_KEY}`,
//     },
//     body: `target_id_type=user_id&target_id=${kakaoUserId}`,
//   })
// }

// function verifyTargetCustomer(user: any) {
//   return (
//     user.kakao_account.gender === 'female' &&
//     new Date().getFullYear() - +user.kakao_account.birthyear >= 40
//   )
// }
