import React from 'react'
import { FormGroup, FormLabel, FormControl } from 'react-bootstrap'

const Slider = ({
  id,
  label,
  minVal,
  maxVal,
  stepVal,
  pageObject,
  onChange
}) => {
  return (
    <>
      <FormGroup>
        <FormLabel>
          {label}: {pageObject[id]}
        </FormLabel>
        <FormControl
          id={id}
          type='range'
          disabled={pageObject.edgeDetector === 'Edge Detector'}
          min={minVal}
          max={maxVal}
          step={stepVal}
          value={pageObject[id]}
          onChange={onChange}
        />
      </FormGroup>
    </>
  )
}

export default Slider
