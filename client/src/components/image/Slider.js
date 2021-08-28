import React from 'react'
import { FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import PropTypes from 'prop-types'

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

Slider.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  minVal: PropTypes.string.isRequired,
  maxVal: PropTypes.string.isRequired,
  stepVal: PropTypes.string.isRequired,
  pageObject: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Slider
