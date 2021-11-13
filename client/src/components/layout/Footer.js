import React from 'react'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='mt-auto p-2 bg-dark text-light footerPin'>
      <div className='text-center'>
        <Image src='/favicon.ico' /> &copy; {new Date().getFullYear()}{' '}
        Singletrack Ventures, LLC ·{' '}
        <Link to='/privacy-policy'> Privacy Policy</Link> ·{' '}
        <Link to='/terms-of-use'>Terms of Use </Link>·{' '}
        <Link to='/contact'>Contact Us</Link>
      </div>
    </footer>
  )
}

export default Footer
