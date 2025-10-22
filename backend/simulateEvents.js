import dotenv from 'dotenv' // secrets
dotenv.config()
// db config
import { initDatabase } from './src/db/init.js'
// models
import { Post } from './src/db/models/post.js'
import { User } from './src/db/models/user.js'
import { Event } from './src/db/models/event.js'
// creation functions
import { createUser } from './src/services/users.js'
import { createPost } from './src/services/posts.js'
import { trackEvent } from './src/services/events.js'

// simulation config
// start and stop dates for the simulation
// a month ago til now
const simulationStart = Date.now() - 1000 * 60 * 60 * 24 * 30
const simulationEnd = Date.now()
// number of users, posts, and views
const simulatedUsers = 5
const simulatedPosts = 10
const simulatedViews = 10000

async function simulateEvents() {
  const connection = await initDatabase()
  // USERS
  // remove all users
  await User.deleteMany({})
  // create specified number of users
  const createdUsers = await Promise.all(
    Array(simulatedUsers)
      .fill(null) // make all values null(?)
      .map(
        // use the index to create usernames and passwords in createUser()
        async (_, u) =>
          await createUser({
            username: `user-${u}`,
            password: `password-${u}`,
          }),
      ),
  )
  console.log(`Created ${createdUsers.length} users`)

  // POSTS
  // remove all users
  await Post.deleteMany({})
  // create specified number of users
  const createdPosts = await Promise.all(
    Array(simulatedPosts)
      .fill(null)
      .map(async (_, p) => {
        // get a random user and use it to make a post
        const randomUser =
          createdUsers[Math.floor(Math.random() * simulatedUsers)]
        return await createPost(randomUser._id, {
          title: `Test Post ${p}`,
          contents: `This is a test post ${p}`,
        })
      }),
  )
  console.log(`Created ${createdPosts.length} posts`)

  // VIEWS
  // remove all views
  await Event.deleteMany({})
  // create specified number of views
  // there will be double db entries from the number of views because it is start+end views
  const createdViews = await Promise.all(
    Array(simulatedViews)
      .fill(null)
      .map(async () => {
        // choose a random post
        const randomPost =
          createdPosts[Math.floor(Math.random() * simulatedPosts)]
        // choose a session start time randomly from between the start and end simulation times
        const sessionStart =
          simulationStart + Math.random() * (simulationEnd - simulationStart)
        // choose a session end time between 0 and 5 mins later than the start
        const sessionEnd =
          sessionStart + 1000 * Math.floor(Math.random() * 60 * 5)
        // create a start view event
        // save it to a variable so that the same session id can be ref'd in the end view event
        const event = await trackEvent({
          postId: randomPost._id,
          action: 'startView',
          date: new Date(sessionStart),
        })
        // create an end view event
        await trackEvent({
          postId: randomPost._id,
          session: event.session,
          action: 'endView',
          date: new Date(sessionEnd),
        })
      }),
  )
  console.log(`successfully simulated ${createdViews.length} views`)
  await connection.disconnect()
}
simulateEvents()
