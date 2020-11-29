import React, { Fragment } from 'react'

const NotFound = () => {
  return (
    <Fragment>
      <h1 class="x-large text-primary">
        <i className="fas fa-exlamation-triangle"></i>Page Not Found
      </h1>
      <p className="large">Sorry, this page does not exist.</p>
    </Fragment>
  )
}

export default NotFound
