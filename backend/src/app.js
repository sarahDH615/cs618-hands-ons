import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { userRoutes } from './routes/users.js'
import { handleSocket } from './socket.js'

const app = express() // create express instance
// middleware - these must be added before calling the routes, else they will not work correctly
app.use(cors())
app.use(bodyParser.json()) // intercepts the requests and converts them to json
userRoutes(app)

// default route
app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

const server = createServer(app) // node:http server
// socket.io server
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})
handleSocket(io)

// export { app }
export { server as app }
