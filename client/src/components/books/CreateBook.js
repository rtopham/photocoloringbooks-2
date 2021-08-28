import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import NewBookWorkSpace from './NewBookWorkSpace'
import NewBookHeader from './NewBookHeader'
import PageFilter from '../pages/PageFilter'
import GalleryImages from '../pages/GalleryImages'
import { clearFilter } from '../../redux/actions/pages'
import { clearCurrentBook } from '../../redux/actions/books'
import PropTypes from 'prop-types'

function CreateBook({
  pages: { gallery },
  current: { pageList },
  editMode,
  clearFilter,
  clearCurrentBook
}) {
  useEffect(() => {
    clearFilter()
  }, [clearFilter])

  useEffect(() => {
    if (editMode) clearCurrentBook()
  }, [editMode, clearCurrentBook])

  if (gallery.length === 0) return <Redirect to='/books' />

  return (
    <div className='container'>
      <div className='mb-4'>
        <NewBookHeader
          heading='New Book: Select Pages'
          backLink='/books'
          forwardLink='/books/cover'
          buttonText='Cover Page'
          disabled={pageList.length === 0}
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

CreateBook.propTypes = {
  pages: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  current: PropTypes.object.isRequired,
  clearFilter: PropTypes.func.isRequired,
  clearCurrentBook: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  pages: state.pages,
  editMode: state.books.editMode,
  current: state.books.current
})

export default connect(mapStateToProps, {
  clearFilter,
  clearCurrentBook
})(CreateBook)
