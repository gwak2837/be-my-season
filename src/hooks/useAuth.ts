import useSWR from 'swr'

async function fetchAuthInfo(url: string) {
  const response = await fetch(url, {
    headers: {
      authorization: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
    },
  })
  return response.json()
}

export default function useAuth() {
  const { data, error } = useSWR('/api/auth', fetchAuthInfo, {
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
