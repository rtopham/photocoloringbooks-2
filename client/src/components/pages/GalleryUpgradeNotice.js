import React from 'react'
import { Link } from 'react-router-dom'

function GalleryUpgradeNotice() {
  return (
    <div>
      <i className='fa fa-exclamation-triangle'></i> You have reached the page
      gallery storage limit for your plan. To save new pages in your gallery,
      delete some pages or upgrade your plan by visiting the{' '}
      <Link to='/dashboard'>Dashboard</Link>.
    </div>
  )
}

export default GalleryUpgradeNotice
