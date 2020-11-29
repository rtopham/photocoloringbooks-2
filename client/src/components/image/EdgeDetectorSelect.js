import React from 'react'
import { FormGroup, FormLabel, FormControl } from 'react-bootstrap'

const EdgeDetectorSelect = ({ pageObject, onChange }) => {
  const selectvals = [
    'Edge Detector',
    'Sobel',
    'Laplace',
    'Prewitt',
    'Robinson',
    'Kirsch',
    'Roberts Cross'
  ]
  return (
    <FormGroup>
      <FormLabel>Edge Detector</FormLabel>
      <FormControl
        as='select'
        id='edgeDetector'
        value={pageObject.edgeDetector}
        onChange={onChange}
      >
        {selectvals.map((option, index) => {
          return (
            <option value={option} key={index}>
              {option}
            </option>
          )
        })}
      </FormControl>
    </FormGroup>
  )
}

export default EdgeDetectorSelect
