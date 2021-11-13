import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { clearFilter } from '../../redux/actions/pages'
import BooksGallery from './BooksGallery'
import NewBookHeader from './NewBookHeader'
import GoogleAd from '../layout/GoogleAd'
import BooksGalleryRenewalNotice from './BooksGalleryRenewalNotice'
import PropTypes from 'prop-types'

const ColoringBooks = ({
  pages: { gallery },
  auth: { user },
  books: { books },
  stripe: { subscription }
}) => {
  return (
    <div className='contentDiv'>
      <GoogleAd />

      <NewBookHeader
        className='mb-4'
        heading='My Books'
        backLink=''
        forwardLink='/books/create'
        buttonText='Create New Book'
        disabled={gallery.length === 0 || books.length >= user.bookLimit}
      />

      <div className='mt-3'>
        {books.length === 0 && (
          <>
            <h5>No coloring books found.</h5>
            <p>
              You do not have any coloring books saved.
              <br />
              To create a new coloring book, you can use the "Create New Book"
              button.
            </p>
          </>
        )}
        {gallery.length === 0 && (
          <p>
            But first you need to create some <Link to='/pages'>Pages</Link> and
            save them in your Gallery.
          </p>
        )}
        <BooksGallery />
      </div>
      {subscription && subscription.status === 'canceled' && (
        <BooksGalleryRenewalNotice />
      )}
    </div>
  )
}

ColoringBooks.propTypes = {
  pages: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  books: PropTypes.object.isRequired,
  stripe: PropTypes.object.isRequired,
  clearFilter: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  pages: state.pages,
  books: state.books,
  stripe: state.stripe
})

export default connect(mapStateToProps, {
  clearFilter
})(ColoringBooks)
