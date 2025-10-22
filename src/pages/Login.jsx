import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useMutation as useGraphQLMutation } from '@apollo/client/react/index.js'
import { LOGIN_USER } from '../api/graphql/users.js'

export function Login() {
  const [, setToken] = useAuth() // leave first var blank(?)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const [loginUser, { loading }] = useGraphQLMutation(LOGIN_USER, {
    variables: { username, password },
    onCompleted: (data) => {
      setToken(data.loginUser)
      navigate('/')
    },
    onError: () => alert('failed to sign up!'),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    loginUser()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Link to='/'>Back to main page</Link>
      <hr />
      <div>
        <label htmlFor='create-username'>Username: </label>
        <input
          type='text'
          name='create-username'
          id='create-username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='create-password'>Password: </label>
        <input
          type='text'
          name='create-password'
          id='create-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <input
        type='submit'
        value={loading ? 'Logging in...' : 'Log In'}
        disabled={!username || !password || loading}
      />
    </form>
  )
}
