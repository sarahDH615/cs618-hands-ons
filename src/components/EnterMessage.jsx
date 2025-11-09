import { useState } from 'react'
import PropTypes from 'prop-types'

export function EnterMessage({ onSend }) {
  const [message, setMessage] = useState('')

  function handleSend(e) {
    e.preventDefault() // prevent page reload
    onSend(message) // send the message
    setMessage('') // set the message variable to empty string
  }

  return (
    <form onSubmit={handleSend}>
      <input
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input type='submit' value='Send' />
    </form>
  )
}

EnterMessage.propTypes = {
  onSend: PropTypes.func.isRequired,
}
