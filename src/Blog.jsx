import { PostList } from './components/PostList.jsx'
import { CreatePost } from './components/CreatePost.jsx'
import { PostFilter } from './components/PostFilter.jsx'
import { PostSorting } from './components/PostSorting.jsx'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from './api/posts.js'

export function Blog() {
  // create query to call the backend and read an endpoint
  const postsQuery = useQuery({
    queryKey: ['posts'], // the endpoint it reads
    queryFn: () => getPosts(), // the function it calls to read the endpoint
  })

  const posts = postsQuery.data ?? [] // get data from the query
  return (
    <div style={{ padding: 8 }}>
      <CreatePost />
      <br />
      <br />
      Filter by:
      <PostFilter field='author' />
      <br />
      <PostSorting fields={['createdAt', 'updatedAt']} />
      <hr />
      <PostList posts={posts} />
    </div>
  )
}
