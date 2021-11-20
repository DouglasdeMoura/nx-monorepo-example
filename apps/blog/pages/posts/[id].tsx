import { useRouter } from 'next/router'
import { useGraphQL } from '../../lib/useGraphQL'

const query = `
{
  postById(id: 5) {
    id
    title
    content
    published
  }
}
`

type Post = {
  id: string
  title: string
  content: string
  published: boolean
}

type Response = {
  postById: Post
}

export default function Post() {
  const { query: { id } } = useRouter()
  return <ThePost id={id.toString()} />
}

function ThePost({ id }: { id: string }) {
  const { data, error, loading } = useGraphQL<Response>(query, { id })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  if (!data) return <p>No data</p>

  const { postById } = data

  return (
    <div>
      <h1>{postById.title}</h1>
      <p>{postById.content}</p>
    </div>
  )
}

