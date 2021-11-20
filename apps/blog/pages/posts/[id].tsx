import { useRouter } from 'next/router'
import { useQuery } from 'urql'

const PostQuery = `
query ($id: Int!) {
  postById (id: $id) {
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

  if (!id)
    return <>Carregando...</>

  return <ThePost id={Number(id)} />
}

function ThePost({ id }: { id: number }) {
  const [ result ] = useQuery<Response>({
    query: PostQuery,
    variables: { id }
  })

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>
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

