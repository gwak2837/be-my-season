import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import PageHead from 'src/components/PageHead'

const description = ''

export default function AuthPage() {
  const url = useRef('')
  const router = useRouter()

  useEffect(() => {
    const queryString = new URLSearchParams(location.search)
    const jwt = queryString.get('jwt')
    const userId = queryString.get('userId')

    if (jwt && userId) {
      toast.success('로그인에 성공했어요')

      if (sessionStorage.getItem('autoLogin')) {
        localStorage.setItem('jwt', jwt)
      } else {
        sessionStorage.setItem('jwt', jwt)
      }

      const redirectionUrlAfterLogin = sessionStorage.getItem('redirectionUrlAfterLogin') ?? '/'
      sessionStorage.removeItem('redirectionUrlAfterLogin')

      if (redirectionUrlAfterLogin === '/@') {
        url.current = `/@${userId}`
      } else {
        url.current = redirectionUrlAfterLogin
      }
    }
  }, [])

  useEffect(() => {
    router.replace(url.current)
  }, [router])

  return (
    <PageHead title="인증 - Be:MySeason" description={description}>
      <div>로그인 중입니다...</div>
    </PageHead>
  )
}
