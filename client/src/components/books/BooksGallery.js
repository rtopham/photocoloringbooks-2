import React from 'react'
import { Spinner, CardColumns } from 'react-bootstrap'
import { connect } from 'react-redux'
import BooksGalleryImage from './BooksGalleryImage'
import DeleteBookModal from './DeleteBookModal'

const BooksGallery = ({ books: { books } }) => {
  if (books === null)
    return (
      <Spinner
        animation='border'
        variant='primary'
        className='d-block mx-auto'
      />
    )
  return (
    <div className='container'>
      <CardColumns>
        {books.map((book) => {
          return <BooksGalleryImage book={book} key={book._id} />
        })}
      </CardColumns>
      <DeleteBookModal />
    </div>
  )
}

const mapStateToProps = (state) => ({
  books: state.books
})

export default connect(mapStateToProps, {})(BooksGallery)
