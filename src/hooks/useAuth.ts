import { fetcherWithJwt } from 'src/utils'
import useSWR from 'swr'

export default function useAuth() {
  const { data, error } = useSWR('/api/auth', fetcherWithJwt, {
    onError: () => {
      sessionStorage.removeItem('jwt')
      localStorage.removeItem('jwt')
    },
  })

  return {
    data,
    isLoading: !error && !data,
    hasError: error,
  }
}
