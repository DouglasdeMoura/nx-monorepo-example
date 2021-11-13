import styled from 'styled-components';
import { useGraphQL } from '../lib/useGraphQL';

const query = `
{
  allPosts {
    id
    title
    content
    published
  }
}
`

type Posts = {
  id: string
  title: string
  content: string
  published: boolean
}

type Response = {
  allPosts: Posts[]
}

export function Index() {
  const { data, error, loading } = useGraphQL<Response>(query)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return <div>
    <h1>Blog</h1>
    {data?.allPosts?.map(post => (
      <div key={post.id}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </div>
    ))}
  </div>;
}

export default Index;
