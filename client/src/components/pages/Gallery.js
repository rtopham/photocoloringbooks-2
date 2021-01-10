import React, { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import { clearFilter, loadGallery } from '../../redux/actions/pages'
import PageFilter from '../pages/PageFilter'
import GalleryImages from '../pages/GalleryImages'

const Gallery = ({ pages: { gallery }, loadGallery, clearFilter }) => {
  useEffect(() => {
    if (gallery === null) {
      loadGallery()
    }
    clearFilter()
  }, [gallery, loadGallery, clearFilter])

  if (gallery === null)
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
        <h1 className='d-inline text-primary'>Gallery</h1>{' '}
      </div>
      <PageFilter />
      <GalleryImages bookMode={false} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  pages: state.pages
})

export default connect(mapStateToProps, {
  loadGallery,
  clearFilter
})(Gallery)
