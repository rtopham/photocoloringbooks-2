import React, { useEffect } from 'react'
import { Spinner, Tabs, Tab } from 'react-bootstrap'
import { connect } from 'react-redux'
import { loadGallery, clearFilter } from '../../redux/actions/pages'
import { loadBooks } from '../../redux/actions/books'
import PageFilter from '../pages/PageFilter'
import GalleryImages from '../pages/GalleryImages'
import NewBookWorkSpace from '../books/NewBookWorkSpace'
import BookPreview from '../books/BookPreview'
import BooksGallery from './BooksGallery'

const ColoringBooks = ({
  pages: { gallery },
  books: {
    books,
    current: { pageList }
  },
  loadGallery,
  loadBooks,
  clearFilter
}) => {
  useEffect(() => {
    if (gallery === null) {
      loadGallery()
    }
    if (books === null) {
      loadBooks()
    }
    clearFilter()
  }, [gallery, books, loadGallery, loadBooks, clearFilter])

  if (gallery === null || books === null)
    return (
      <Spinner
        animation='border'
        variant='primary'
        className='d-block mx-auto'
      />
    )

  return (
    <div className='container'>
      <div className='mb-4'>
        <h1 className='d-inline text-primary'>Coloring Books</h1>{' '}
      </div>

      <Tabs defaultActiveKey='myBooks'>
        <Tab eventKey='myBooks' title='My Books'>
          <div className='mt-3'>
            {books !== null && books.length === 0 && (
              <>
                <h5>No coloring books found.</h5>
                <p>You do not have any coloring books saved.</p>
                <p>
                  {' '}
                  To create a new coloring book, select the "Create New Book"
                  tab on this page.
                </p>
                ,
              </>
            )}
            {books.length !== null && books.length > 0 && <BooksGallery />}
          </div>
        </Tab>
        <Tab eventKey='createBook' title='Create New Book'>
          <div className='mt-3'>
            <NewBookWorkSpace />
            <PageFilter />
            <GalleryImages bookMode={true} />
          </div>
        </Tab>
        {pageList.length > 0 ? (
          <Tab eventKey='previewBook' title='Preview and Save'>
            <BookPreview />
          </Tab>
        ) : null}
      </Tabs>
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  pages: state.pages,
  books: state.books
})

export default connect(mapStateToProps, {
  loadGallery,
  loadBooks,
  clearFilter
})(ColoringBooks)
