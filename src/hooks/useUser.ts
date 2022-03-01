import useSWR from 'swr'

async function fetchUser(url: string) {
  const response = await fetch(url, {
    headers: {
      authorization:
        globalThis.sessionStorage?.getItem('jwt') ?? globalThis.localStorage?.getItem('jwt') ?? '',
    },
  })
  return response.json()
}

export default function useUser() {
  const { data, error } = useSWR('/api/auth', fetchUser, {
    onError: () => {
      sessionStorage.removeItem('jwt')
      localStorage.removeItem('jwt')
    },
  })

  return {
    user: data,
    isLoading: !error && !data,
    hasError: error,
  }
}
