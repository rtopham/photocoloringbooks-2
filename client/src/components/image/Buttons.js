import React from 'react'
import { connect } from 'react-redux'
import { Button, ButtonGroup, Col } from 'react-bootstrap'

const Buttons = ({ pageObject, onClick, isAuthenticated, upLoad }) => {
  return (
    <>
      <Col>
        <ButtonGroup>
          <Button id='reset' onClick={onClick} active={pageObject.reset}>
            Reset
          </Button>
          <Button id='smooth' onClick={onClick} active={pageObject.smooth}>
            Smooth
          </Button>
          <Button id='invert' onClick={onClick} active={pageObject.invert}>
            Invert
          </Button>
        </ButtonGroup>
      </Col>
      <Col>
        <ButtonGroup>
          <Button id='gray' onClick={onClick} active={pageObject.gray}>
            Gray
          </Button>
          <Button id='monoR' onClick={onClick} active={pageObject.mono}>
            <span className='d-none d-lg-inline'>Mono</span>(R)
          </Button>
          <Button id='monoG' onClick={onClick} active={pageObject.mono}>
            <span className='d-none d-lg-inline'>Mono</span>(G)
          </Button>
          <Button id='monoB' onClick={onClick} active={pageObject.mono}>
            <span className='d-none d-lg-inline'>Mono</span>(B)
          </Button>
        </ButtonGroup>
      </Col>
      <Col>
        <ButtonGroup>
          <Button
            variant='success'
            id='plus'
            onClick={onClick}
            active={false}
            disabled={pageObject.size === 100}
          >
            +
          </Button>
          <Button
            variant='success'
            id='minus'
            onClick={onClick}
            active={false}
            disabled={pageObject.size <= 10}
          >
            -
          </Button>
        </ButtonGroup>
      </Col>
      <Col>
        <ButtonGroup>
          {isAuthenticated && (
            <Button
              variant='primary'
              id='save'
              onClick={onClick}
              active={false}
              disabled={pageObject.edgeDetector === 'Edge Detector'}
            >
              Save
            </Button>
          )}
        </ButtonGroup>{' '}
        {
          <React.Fragment>
            <span>
              <input
                className='d-none'
                accept='image/*'
                onChange={upLoad}
                id='icon-button-file-2'
                type='file'
              />
              <label htmlFor='icon-button-file-2'>
                <Button variant='primary' id='load' as='span'>
                  Load Image
                </Button>
              </label>
            </span>
          </React.Fragment>
        }
      </Col>

      <hr className='text-center' />
    </>
  )
}

const mapStateToProps = (state) => ({
  saving: state.pages.saving
})

export default connect(mapStateToProps, {})(Buttons)
