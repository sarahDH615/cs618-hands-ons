import { createMessage, getMessagesByRoom } from './messages.js'

// send to one person, don't store in the database
export function sendPrivateMessage(
  socket,
  { username, room, message, replayed },
) {
  socket.emit('chat.message', { username, message, room, replayed })
}

// system notifications, eg join notifications; don't store in db
// send to everyone in the room
export function sendSystemMessage(io, { room, message }) {
  io.to(room).emit('chat.message', { message, room })
}

// sending regular messages in a room
export function sendPublicMessage(io, { username, room, message }) {
  io.to(room).emit('chat.message', { username, message, room })
  createMessage({ username, message, room })
}

// join a room, send join message
export async function joinRoom(io, socket, { room }) {
  socket.join(room)
  sendSystemMessage(io, {
    room,
    message: `User "${socket.user.username}" joined room "${room}"`,
  })
  // replay all messages privately just to the joined user
  const messages = await getMessagesByRoom(room)
  messages.forEach(({ username, message }) =>
    sendPrivateMessage(socket, { username, message, room, replayed: true }),
  )
}

// service function to get user info from socket id
export async function getUserInfoBySocketId(io, socketId) {
  const sockets = await io.in(socketId).fetchSockets()
  if (sockets.length === 0) return null
  const socket = sockets[0]
  const userInfo = {
    socketId,
    rooms: Array.from(socket.rooms),
    user: socket.user,
  }
  return userInfo
}
