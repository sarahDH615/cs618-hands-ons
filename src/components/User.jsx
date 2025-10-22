import PropTypes from 'prop-types'

export function User({ username }) {
  return <strong>{username}</strong> // returns the username if possible, else id
}
User.propTypes = {
  username: PropTypes.string.isRequired,
}
