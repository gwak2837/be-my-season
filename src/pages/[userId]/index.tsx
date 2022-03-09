import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { toast } from 'react-toastify'
import PageHead from 'src/components/PageHead'
import useAuth from 'src/hooks/useAuth'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { defaultFetcher, fetcherWithJwt } from 'src/utils'
import useSWR, { useSWRConfig } from 'swr'

const description = ''

export default function MyPage() {
  const { data: user } = useAuth()
  const router = useRouter()
  const { mutate } = useSWRConfig()

  function logout() {
    sessionStorage.removeItem('jwt')
    localStorage.removeItem('jwt')
    mutate('/api/auth')
    toast.success('로그아웃에 성공했어요')

    router.replace('/')
  }

  async function unregister() {
    await fetch('/api/user', {
      method: 'DELETE',
      headers: {
        authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
      },
    })

    sessionStorage.removeItem('jwt')
    localStorage.removeItem('jwt')
    mutate('/api/auth')
    toast.success('탈퇴에 성공했어요')
    router.replace('/')
  }

  // Fetch participate list
  const { data, error } = useSWR('/api/user', fetcherWithJwt)

  return (
    <PageHead title="마이페이지 - Be:MySeason" description={description}>
      <div>user id: {user?.userId}</div>
      <div>is admin: {user?.isAdmin}</div>
      <button onClick={logout}>로그아웃</button>
      <button onClick={unregister}>회원탈퇴</button>

      {data ? (
        (data.myList as any[]).map((my, i) => (
          <li key={i}>
            <pre>{JSON.stringify(my, null, 2)}</pre>
          </li>
        ))
      ) : error ? (
        <div>error</div>
      ) : (
        <div>loading...</div>
      )}
    </PageHead>
  )
}

MyPage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}
