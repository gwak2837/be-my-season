import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { fetcherWithJwt } from 'src/utils'
import useSWR from 'swr'

export default function useRequireAdmin() {
  const router = useRouter()

  const { data } = useSWR('/api/auth', fetcherWithJwt, {
    onError: () => {
      sessionStorage.removeItem('jwt')
      localStorage.removeItem('jwt')
    },
  })

  useEffect(() => {
    if (data && !data.isAdmin) {
      toast.warn('관리자 로그인이 필요한 페이지입니다')
      sessionStorage.setItem('redirectionUrlAfterLogin', router.asPath)
      router.replace('/login')
    }
  }, [data, router])
}
