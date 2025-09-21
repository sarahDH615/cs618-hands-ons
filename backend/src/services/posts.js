import { Post } from '../db/models/post.js'
import { User } from '../db/models/user.js'

export async function createPost(userId, { title, contents, tags }) {
  const post = new Post({ title, author: userId, contents, tags })
  return await post.save()
}

// list posts according on query passed in with sorting
async function listPosts(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  return await Post.find(query).sort({ [sortBy]: sortOrder })
}
// list all posts by calling listPosts() with empty query
export async function listAllPosts(options) {
  return await listPosts({}, options)
}
// list posts by author by passing in author as query to listPosts()
export async function listPostsByAuthor(authorUsername, options) {
  const user = await User.findOne({ username: authorUsername })
  if (!user) return []
  return await listPosts({ author: user._id }, options)
}
// list posts by tags by passing in tags as query to listPosts()
export async function listPostsByTag(tags, options) {
  return await listPosts({ tags }, options)
}
// get posts using id
export async function getPostById(postId) {
  return await Post.findById(postId)
}
// update a post
export async function updatePost(userId, postId, { title, contents, tags }) {
  return await Post.findOneAndUpdate(
    { _id: postId, author: userId },
    { $set: { title, contents, tags } },
    { new: true },
  )
}
// delete a post
export async function deletePost(userId, postId) {
  return await Post.deleteOne({ _id: postId, author: userId })
}
