import jwt from 'jsonwebtoken'
import { getUserInfoById } from './services/users.js'
import {
  joinRoom,
  sendPublicMessage,
  getUserInfoBySocketId,
} from './services/chat.js'

export function handleSocket(io) {
  // join public room
  io.on('connection', (socket) => {
    joinRoom(io, socket, { room: 'public' })
    // listener for chat.message event
    socket.on('chat.message', (room, message) => {
      sendPublicMessage(io, { username: socket.user.username, room, message })
    })
    socket.on('user.info', async (socketId, callback) =>
      callback(await getUserInfoBySocketId(io, socketId)),
    )
    socket.on('chat.join', (room) => joinRoom(io, socket, { room }))
  })
  io.use((socket, next) => {
    if (!socket.handshake.auth?.token) {
      return next(new Error('Authentication failed: no token provided'))
    }
    jwt.verify(
      socket.handshake.auth.token,
      process.env.JWT_SECRET,
      async (err, decodedToken) => {
        if (err) {
          return next(new Error('Authentication failed: invalid token'))
        }
        socket.auth = decodedToken
        socket.user = await getUserInfoById(socket.auth.sub)
        return next()
      },
    )
  })
}
