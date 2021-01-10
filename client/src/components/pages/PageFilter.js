import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { filterPages, clearFilter } from '../../redux/actions/pages'

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
      console.log(filtered)
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

const mapStateToProps = (state) => ({
  pages: state.pages
})

export default connect(mapStateToProps, { filterPages, clearFilter })(
  PageFilter
)
