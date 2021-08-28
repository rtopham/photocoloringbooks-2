import React from 'react'
import ViewImage from '../image/ViewImage'

const View = ({ match }) => {
  return (
    <section className='container'>
      <h1 className='d-inline text-primary'>View and Print Page</h1>{' '}
      <ViewImage pageId={match.params.id} />
    </section>
  )
}

export default View
