import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Slider from './Slider'
import Buttons from './Buttons'
import EdgeDetectorSelect from './EdgeDetectorSelect'
import PropTypes from 'prop-types'

const Controls = ({
  isAuthenticated,
  onClick,
  onChange,
  upLoad,

  pageObject
}) => {
  return (
    <Container>
      <Row>
        <Buttons
          pageObject={pageObject}
          onClick={onClick}
          isAuthenticated={isAuthenticated}
          upLoad={upLoad}
        />
      </Row>
      <Row>
        <Col lg={3}>
          <EdgeDetectorSelect pageObject={pageObject} onChange={onChange} />
        </Col>
        <Col lg={3}>
          <Slider
            id='threshold'
            label='Threshold'
            minVal='0'
            maxVal='255'
            stepVal='1'
            onChange={onChange}
            pageObject={pageObject}
          />
        </Col>
        <Col lg={3}>
          <Slider
            id='multiplier'
            label='Multiplier'
            minVal='0.1'
            maxVal='5'
            stepVal='0.1'
            onChange={onChange}
            pageObject={pageObject}
          />
        </Col>
      </Row>
    </Container>
  )
}

Controls.propTypes = {
  pageObject: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  upload: PropTypes.string
}

export default Controls
