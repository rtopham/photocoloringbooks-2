import React, { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import { loadGallery } from '../../redux/actions/pages'
import PublicEditImage from '../image/PublicEditImage'
import PageForm from '../pages/PageForm'

const Gallery = ({ auth: { user }, pages: { gallery }, loadGallery }) => {
  useEffect(() => {
    if (gallery === null) {
      loadGallery()
    }
  }, [])

  if (gallery === null)
    return (
      <Spinner
        animation='border'
        variant='primary'
        className='d-block mx-auto'
      />
    )
  return (
    <section className='container'>
      <h1 className='d-inline text-primary'>Gallery</h1>{' '}
      {/*       <p className='d-inline lead'>
        <i className='fas fa-user'></i> {user && user.name}
      </p> */}
      {gallery.map((page) => {
        return <img src={`/pages/${page.filename}`} />
      })}
    </section>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  pages: state.pages
})

export default connect(mapStateToProps, { loadGallery })(Gallery)
