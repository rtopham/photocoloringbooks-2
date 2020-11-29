import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Slider from './Slider'
import Buttons from './Buttons'
import EdgeDetectorSelect from './EdgeDetectorSelect'

const Controls = ({
  isAuthenticated,
  onClick,
  onChange,
  upLoad,
  clickSave,
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
          clickSave={clickSave}
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

export default Controls
