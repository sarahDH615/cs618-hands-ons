import PropTypes from 'prop-types'

export function PostFilter({ field }) {
  return (
    <div>
      <label htmlFor={`filter-${field}`}>filter: {field}</label>
      <input
        type='text'
        name={`filter-${field}`}
        id={`filter-${field}`}
      ></input>
    </div>
  )
}
PostFilter.propTypes = {
  field: PropTypes.string.isRequired,
}
