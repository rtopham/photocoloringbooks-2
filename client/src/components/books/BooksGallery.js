import React from 'react'
import { CardColumns } from 'react-bootstrap'
import { connect } from 'react-redux'
import BooksGalleryImage from './BooksGalleryImage'
import GalleryFullNotice from './GalleryFullNotice'
import DeleteBookModal from './DeleteBookModal'
import PropTypes from 'prop-types'
import BooksGalleryUpgradeNotice from './BooksGalleryUpgradeNotice'

const BooksGallery = ({
  auth: { user },
  books: { books },
  stripe: { subscription }
}) => {
  let pdfDisabled = false
  if (subscription && subscription.status === 'canceled') pdfDisabled = true
  return (
    <div className=''>
      <CardColumns>
        {books.map((book) => {
          return (
            <BooksGalleryImage
              pdfDisabled={pdfDisabled}
              book={book}
              key={book._id}
            />
          )
        })}
      </CardColumns>
      {!subscription && books.length >= user.bookLimit && (
        <BooksGalleryUpgradeNotice />
      )}
      {subscription &&
        subscription.status === 'active' &&
        books.length >= user.bookLimit && <GalleryFullNotice />}
      <DeleteBookModal />
    </div>
  )
}

BooksGallery.propTypes = {
  books: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  books: state.books,
  stripe: state.stripe
})

export default connect(mapStateToProps, {})(BooksGallery)
