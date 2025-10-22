import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { postsRoutes } from './routes/posts.js'
import { userRoutes } from './routes/users.js'
import { eventRoutes } from './routes/events.js'

const app = express() // create express instance
// middleware - these must be added before calling the routes, else they will not work correctly
app.use(cors())
app.use(bodyParser.json()) // intercepts the requests and converts them to json
postsRoutes(app) // call postRoutes with express instance as param
userRoutes(app)
eventRoutes(app)

// default route
app.get('/', (req, res) => {
  res.send('Hello from Express!')
})
export { app }
