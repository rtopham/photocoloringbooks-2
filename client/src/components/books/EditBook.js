import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import NewBookWorkSpace from './NewBookWorkSpace'
import NewBookHeader from './NewBookHeader'
import PageFilter from '../pages/PageFilter'
import GalleryImages from '../pages/GalleryImages'
import { clearFilter } from '../../redux/actions/pages'
import PropTypes from 'prop-types'

function EditBook({ pages: { gallery }, clearFilter }) {
  useEffect(() => {
    clearFilter()
  }, [clearFilter])

  if (gallery.length === 0) return <Redirect to='/books' />
  return (
    <div className='container'>
      <div className='mb-4'>
        <NewBookHeader
          heading='Edit Book: Select Pages'
          backLink='/books'
          forwardLink='/books/edit/cover'
          buttonText='Cover Page'
        />
      </div>
      <div className='mt-3'>
        <NewBookWorkSpace />
        <PageFilter />
        <GalleryImages bookMode={true} />
      </div>
    </div>
  )
}

EditBook.propTypes = {
  pages: PropTypes.object.isRequired,
  clearFilter: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  pages: state.pages,
  clearFilter: PropTypes.func.isRequired
})

export default connect(mapStateToProps, {
  clearFilter
})(EditBook)
