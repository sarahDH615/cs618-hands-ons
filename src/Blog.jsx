import { PostList } from './components/PostList.jsx'
import { CreatePost } from './components/CreatePost.jsx'
import { PostFilter } from './components/PostFilter.jsx'
import { PostSorting } from './components/PostSorting.jsx'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from './api/posts.js'
import { useState } from 'react'

export function Blog() {
  const [author, setAuthor] = useState('') // default: ''
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  // create query to call the backend and read an endpoint
  const postsQuery = useQuery({
    queryKey: ['posts', { author, sortBy, sortOrder }], // the endpoint it reads and the params it passes to it
    queryFn: () => getPosts({ author, sortBy, sortOrder }), // the function it calls to read the endpoint
  })

  const posts = postsQuery.data ?? [] // get data from the query
  return (
    <div style={{ padding: 8 }}>
      <h1>Glad tidings. This is my blog</h1>
      <CreatePost />
      <br />
      <br />
      Filter by:
      <PostFilter
        field='author'
        value={author}
        onChange={(value) => setAuthor(value)}
      />
      <br />
      <PostSorting
        fields={['createdAt', 'updatedAt']}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <hr />
      <PostList posts={posts} />
    </div>
  )
}
