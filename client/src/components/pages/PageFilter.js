import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { filterPages, clearFilter } from '../../redux/actions/pages'
import PropTypes from 'prop-types'

const PageFilter = ({ pages: { filtered }, filterPages, clearFilter }) => {
  const text = useRef('')

  useEffect(() => {
    if (filtered === null) {
      text.current.value = ''
    }
  })

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterPages(e.target.value)
    } else {
      clearFilter()
    }
  }
  return (
    <form className='d-inline'>
      <input
        className='mb-3 mr-3'
        ref={text}
        type='text'
        placeholder='Filter pages...'
        onChange={onChange}
      />
    </form>
  )
}

PageFilter.propTypes = {
  pages: PropTypes.object.isRequired,
  filterPages: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  pages: state.pages
})

export default connect(mapStateToProps, { filterPages, clearFilter })(
  PageFilter
)
