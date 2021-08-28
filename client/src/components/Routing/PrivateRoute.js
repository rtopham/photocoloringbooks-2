import React from 'react'
import { Spinner } from 'react-bootstrap'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, userLoading },
  books: { booksLoading },
  pages: { galleryLoading },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        userLoading || booksLoading || galleryLoading ? (
          <Spinner
            animation='border'
            variant='primary'
            className='d-block mx-auto'
          />
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  )
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  pages: PropTypes.object.isRequired,
  books: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  pages: state.pages,
  books: state.books
})

export default connect(mapStateToProps)(PrivateRoute)
