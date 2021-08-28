import React from 'react'
import { Link } from 'react-router-dom'

const BooksGalleryUpgradeNotice = () => {
  return (
    <div>
      <i className='fa fa-exclamation-triangle'></i> You have reached the book
      gallery storage limit for your plan. To create more books, upgrade your
      plan by visiting the <Link to='/dashboard'>Dashboard</Link>.
    </div>
  )
}

export default BooksGalleryUpgradeNotice
