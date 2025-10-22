import {
  trackEvent,
  getTotalViews,
  getDailyViews,
  getDailyDurations,
} from '../services/events.js'
import { getPostById } from '../services/posts.js'

export function eventRoutes(app) {
  // create an event
  app.post('/api/v1/events', async (req, res) => {
    try {
      // extract relevant fields from the request body
      const { postId, session, action } = req.body
      // make sure post exists - if it doesn't, return error
      const post = await getPostById(postId)
      if (post === null) {
        return res.status(400).end()
      }
      // otherwise create event
      // default today date is applied in the trackEvent function
      const event = await trackEvent({ postId, session, action })
      // return the session
      return res.json({ session: event.session })
    } catch (err) {
      console.error('error tracking event: ', err)
      return res.status(500).end()
    }
  })

  app.get('/api/v1/events/totalViews/:postId', async (req, res) => {
    try {
      // set postId param as a variable
      const { postId } = req.params
      // make sure post exists - if it doesn't, return error
      const post = await getPostById(postId)
      if (post === null) {
        return res.status(400).end()
      }
      // otherwise get stats
      const stats = await getTotalViews(post._id)
      // return the session
      return res.json(stats)
    } catch (err) {
      console.error('error getting total views: ', err)
      return res.status(500).end()
    }
  })

  app.get('/api/v1/events/dailyViews/:postId', async (req, res) => {
    try {
      // set postId param as a variable
      const { postId } = req.params
      // make sure post exists - if it doesn't, return error
      const post = await getPostById(postId)
      if (post === null) {
        return res.status(400).end()
      }
      // otherwise get stats
      const stats = await getDailyViews(post._id)
      // return the session
      return res.json(stats)
    } catch (err) {
      console.error('error getting daily views: ', err)
      return res.status(500).end()
    }
  })

  app.get('/api/v1/events/dailyDurations/:postId', async (req, res) => {
    try {
      // set postId param as a variable
      const { postId } = req.params
      // make sure post exists - if it doesn't, return error
      const post = await getPostById(postId)
      if (post === null) {
        return res.status(400).end()
      }
      // otherwise get stats
      const stats = await getDailyDurations(post._id)
      // return the session
      return res.json(stats)
    } catch (err) {
      console.error('error getting total views: ', err)
      return res.status(500).end()
    }
  })
}
