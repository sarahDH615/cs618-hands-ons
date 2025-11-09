import { useChat } from '../hooks/useChat'
import { EnterMessage } from '../components/EnterMessage'
import { ChatMessage } from './ChatMessage'

export function ChatRoom() {
  const { messages, sendMessage } = useChat()
  return (
    <div>
      {messages.map((message, index) => (
        <ChatMessage key={index} {...message} />
      ))}
      <EnterMessage onSend={sendMessage} />
    </div>
  )
}
