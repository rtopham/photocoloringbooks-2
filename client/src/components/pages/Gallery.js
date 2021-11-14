import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { clearFilter } from '../../redux/actions/pages'
import PageFilter from '../pages/PageFilter'
import GalleryImages from '../pages/GalleryImages'
import GalleryUpgradeNotice from '../pages/GalleryUpgradeNotice'
import GalleryFullNotice from '../pages/GalleryFullNotice'
import GoogleAd from '../layout/GoogleAd'
import PropTypes from 'prop-types'

const Gallery = ({
  pages: { gallery },
  auth: { user },
  stripe: { subscription },
  clearFilter
}) => {
  useEffect(() => {
    clearFilter()
  }, [clearFilter])

  if (gallery && gallery.length === 0)
    return (
      <div>
        <div className='mb-4'>
          <h1 className='d-inline text-primary'>Gallery</h1>{' '}
        </div>
        <h5>No pages found.</h5>
        <p>
          You do not have any pages saved.
          <br />
          To create a new coloring book page go to:{' '}
          <Link to='/pages'>Create Pages</Link>.
        </p>
      </div>
    )

  return (
    <div className='contentDiv'>
      <GoogleAd />
      <div className='mb-4'>
        <h1 className='d-inline text-primary'>Gallery</h1>{' '}
      </div>
      <PageFilter />
      <GalleryImages bookMode={false} />
      {!subscription && gallery.length >= user.galleryLimit && (
        <GalleryUpgradeNotice />
      )}
      {subscription &&
        subscription.status === 'active' &&
        gallery.length >= user.galleryLimit && <GalleryFullNotice />}
    </div>
  )
}

Gallery.propTypes = {
  auth: PropTypes.object.isRequired,
  pages: PropTypes.object.isRequired,
  stripe: PropTypes.object.isRequired,
  clearFilter: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  pages: state.pages,
  stripe: state.stripe
})

export default connect(mapStateToProps, {
  clearFilter
})(Gallery)
