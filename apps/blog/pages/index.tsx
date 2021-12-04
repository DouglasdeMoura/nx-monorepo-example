import Link from 'next/link'
import { useQuery } from 'urql'

const PostsQuery = `
{
  allPosts {
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
  allPosts: Post[]
}

export function Index() {
  const [ result ] = useQuery<Response>({
    query: PostsQuery,
  })

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return <div>
    <h1>Blog</h1>
    {data?.allPosts?.map(post => (
      <div key={post.id}>
        <h2>
          <Link href={{
            pathname: '/posts/[id]',
            query: { id: post.id },
          }}>
            <a>{post.title}</a>
          </Link>
        </h2>
        <p>{post.content}</p>
      </div>
    ))}
  </div>;
}

export default Index;
