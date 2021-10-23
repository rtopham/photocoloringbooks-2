import React from 'react'
import { Link } from 'react-router-dom'

const Instructions = () => {
  return (
    <div className='mt-3'>
      <h1>Welcome to the all new photocoloringbooks.com</h1>
      Use the simple free web app above to create a coloring book page from your
      favorite photo in a few easy steps:
      <ul>
        <li>Load your image</li>
        <li>Choose an edge detector</li>
        <li>
          Invert image and apply smoothing and gray/mono options if desired
        </li>
        <li>Adjust threshold and scale</li>
        <li>Click the blue printer icon to print</li>
      </ul>
      {process.env.REACT_APP_NAV === 'true' && (
        <p>
          <Link to='/register'>Register</Link> for the free plan to store up to
          six pages and create a PDF coloring book to print or share with your
          favorite aspiring artist. Upgrade to the premium plan for a small fee
          to store up to 50 pages and store up to six coloring books.{' '}
          <a href='/samplebook.pdf'> View sample PDF</a>.
        </p>
      )}
    </div>
  )
}

export default Instructions
