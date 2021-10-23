import React from 'react'

const Instructions = () => {
  return (
    <div className='mt-3'>
      Create and save a coloring book page from your favorite photo in a few
      easy steps:
      <ul>
        <li>Load your image</li>
        <li>Choose an edge detector</li>
        <li>
          Invert image and apply smoothing and gray/mono options if desired
        </li>
        <li>Adjust threshold and scale</li>
        <li>
          Click the blue printer icon to print, or click "Save" to save it to
          your gallery
        </li>
      </ul>
    </div>
  )
}

export default Instructions
