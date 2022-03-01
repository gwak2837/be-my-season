import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { toast } from 'react-toastify'
import PageHead from 'src/components/PageHead'
import useUser from 'src/hooks/useUser'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { useSWRConfig } from 'swr'

const description = ''

export default function MyPage() {
  const { user } = useUser()
  const router = useRouter()
  const { mutate } = useSWRConfig()

  function removeJwtFromStorage() {
    sessionStorage.removeItem('jwt')
    localStorage.removeItem('jwt')
    mutate('/api/auth')

    toast.success('로그아웃에 성공했어요')
    router.replace('/')
  }

  return (
    <PageHead title="마이페이지 - Be:MySeason" description={description}>
      <div>user id: {user?.userId}</div>
      <div>is admin: {user?.isAdmin}</div>
      <button onClick={removeJwtFromStorage}>로그아웃</button>
    </PageHead>
  )
}

MyPage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}
