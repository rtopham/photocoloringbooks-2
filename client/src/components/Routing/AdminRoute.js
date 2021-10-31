import React from 'react'
import { Spinner } from 'react-bootstrap'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import NotFound from '../layout/NotFound'

const AdminRoute = ({
  component: Component,
  auth,
  auth: { isAuthenticated, userLoading, user },
  books: { booksLoading },
  pages: { galleryLoading },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated &&
        (!user || userLoading || booksLoading || galleryLoading) ? (
          <Spinner
            animation='border'
            variant='primary'
            className='d-block mx-auto'
          />
        ) : isAuthenticated &&
          !userLoading &&
          !booksLoading &&
          !galleryLoading &&
          user.role === 'admin' ? (
          <Component {...props} />
        ) : isAuthenticated && !userLoading && user.role !== 'admin' ? (
          <NotFound />
        ) : !isAuthenticated && !userLoading ? (
          <NotFound />
        ) : null
      }
    />
  )
}

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  pages: PropTypes.object.isRequired,
  books: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  pages: state.pages,
  books: state.books
})

export default connect(mapStateToProps)(AdminRoute)
