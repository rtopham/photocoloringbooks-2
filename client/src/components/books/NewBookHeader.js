import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const NewBookHeader = ({
  heading,
  backLink,
  forwardLink,
  buttonText,
  buttonCallBack,
  disabled
}) => {
  return (
    <Row>
      <Col>
        <h1 className='d-inline text-primary'>{heading}</h1>{' '}
      </Col>
      <Col className='align-self-end'>
        {forwardLink && (
          <Link to={forwardLink}>
            <Button className='float-right' disabled={disabled}>
              {buttonText}
            </Button>
          </Link>
        )}
        {!forwardLink && buttonCallBack && (
          <Button className='float-right' onClick={buttonCallBack}>
            {buttonText}
          </Button>
        )}
        {backLink && (
          <Link to={backLink}>
            <Button className='float-right mr-2'>
              <i className='fas fa-caret-left' />
            </Button>
          </Link>
        )}
      </Col>
    </Row>
  )
}

NewBookHeader.propTypes = {
  heading: PropTypes.string,
  backLink: PropTypes.string,
  forwardLink: PropTypes.string,
  buttonText: PropTypes.string,
  buttonCallBack: PropTypes.func,
  disabled: PropTypes.bool
}

export default NewBookHeader
