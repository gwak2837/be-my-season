import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import PageHead from 'src/components/PageHead'
import { useSWRConfig } from 'swr'

const description = ''

export default function MyPage() {
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
      <div>user id: {router.query.userId?.slice(1)}</div>
      <button onClick={removeJwtFromStorage}>로그아웃</button>
    </PageHead>
  )
}
