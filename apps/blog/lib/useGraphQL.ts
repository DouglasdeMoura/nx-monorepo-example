import { useEffect, useState } from 'react'

async function fetchGraphQL<Data>(text, variables) {
  return fetch(`http://localhost:4000/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  })
  .then(res => res.json() as Promise<{ data: Data }>)
  .then(res => res.data)
}

export function useGraphQL<Data>(query: string, variables?: { [key: string]: any }) {
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Data>()

  useEffect(() => {
    if (!query) return

    setLoading(true)

    fetchGraphQL<Data>(query, variables)
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false))
  }, [])

  return { error, loading, data }
}
