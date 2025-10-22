import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext.jsx'
import { User } from './User.jsx'
import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '../api/users.js'

export function Header() {
  const [token, setToken] = useAuth()
  const { sub } = token ? jwtDecode(token) : {}
  const userInfoQuery = useQuery({
    queryKey: ['users', 'sub'],
    queryFn: () => getUserInfo(sub),
    enabled: Boolean(sub),
  })
  const userInfo = userInfoQuery.data

  if (token) {
    return (
      <div>
        <p>
          Logged in as <User {...userInfo} />
        </p>
        <button onClick={() => setToken(null)}>Log Out</button>
      </div>
    )
  }
  return (
    <div>
      <h1>Welcome to the blog!</h1>
      <Link to='/signup'>Sign Up</Link> | <Link to='/login'>Log In</Link>
    </div>
  )
}
