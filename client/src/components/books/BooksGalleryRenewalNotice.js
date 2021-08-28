import React from 'react'
import { Link } from 'react-router-dom'

const BooksGalleryRenewalNotice = () => {
  return (
    <div>
      <i className='fa fa-exclamation-triangle'></i> Your subscription to the
      premium plan has expired. You still have access to your pages and coloring
      books, but PDF features have been disabled. To restore PDF features and
      enjoy ad-free access to your pages and coloring books, please renew your
      subscription by visiting the <Link to='/dashboard'>Dashboard</Link>.
    </div>
  )
}

export default BooksGalleryRenewalNotice
