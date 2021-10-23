import React from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import ViewImage from '../image/ViewImage'

const View = ({ match }) => {
  return (
    <>
      <Row>
        <Col>
          <h1 className='d-inline text-primary'>View and Print Page</h1>{' '}
        </Col>
        <Col className='align-self-end'>
          <Link to={`/gallery`}>
            <Button className='float-right mr-2'>
              <i className='fas fa-caret-left' />
            </Button>
          </Link>
        </Col>
      </Row>{' '}
      <ViewImage pageId={match.params.id} />
    </>
  )
}

export default View
