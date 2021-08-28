import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Modal,
  Button,
  Col
} from 'react-bootstrap'
import PropTypes from 'prop-types'

const CoverPageForm = ({
  show,
  handleCancel,
  handleSave,
  coverPage,
  books: {
    current: { pageList }
  }
}) => {
  const [formData, setFormData] = useState(coverPage)

  const {
    title,
    textLine1,
    textLine2,
    textLine3,
    imageNumber,
    footer
  } = formData

  const onChange = (e) => {
    let value = e.target.value
    if (e.target.name === 'imageNumber') value = parseInt(e.target.value)
    setFormData({ ...formData, [e.target.name]: value })
  }

  const clickCancel = () => {
    handleCancel()
  }

  const onSubmit = (e) => {
    e.preventDefault()
    handleSave(formData)
  }

  return (
    <div>
      <Modal
        show={show}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        onHide={clickCancel}
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Edit Cover Page
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <FormGroup controlId='title'>
              <FormLabel>Title</FormLabel>
              <FormControl
                name='title'
                value={title}
                onChange={onChange}
                maxLength='26'
              />
            </FormGroup>
            <FormGroup controlId='textLine1'>
              <FormLabel>Text line 1</FormLabel>
              <FormControl
                name='textLine1'
                value={textLine1}
                onChange={onChange}
                maxLength='60'
              />
            </FormGroup>
            <FormGroup controlId='textLine2'>
              <FormLabel>Text line 2</FormLabel>
              <FormControl
                name='textLine2'
                value={textLine2}
                onChange={onChange}
                maxLength='60'
              />
            </FormGroup>
            <FormGroup controlId='textLine3'>
              <FormLabel>Text line 3</FormLabel>
              <FormControl
                name='textLine3'
                value={textLine3}
                onChange={onChange}
                maxLength='60'
              />
            </FormGroup>
            <FormGroup controlId='footer'>
              <FormLabel>Footer</FormLabel>
              <FormControl
                name='footer'
                value={footer}
                onChange={onChange}
                maxLength='60'
              />
            </FormGroup>
            <FormGroup as={Col}>
              <Form.Control
                plaintext
                readOnly
                defaultValue='Include image(s):'
              />
              <Form.Check
                inline
                name='coverPageType'
                label='No Image'
                id='no-image'
                type='radio'
                onChange={onChange}
                value='no-image'
                checked={formData.coverPageType === 'no-image'}
              />
              <Form.Check
                inline
                name='coverPageType'
                label='Collage'
                id='collage'
                type='radio'
                onChange={onChange}
                value='collage'
                checked={formData.coverPageType === 'collage'}
              />
              <Form.Check
                inline
                name='coverPageType'
                label='Single Image'
                id='single-image'
                type='radio'
                onChange={onChange}
                value='single-image'
                checked={formData.coverPageType === 'single-image'}
              />
              {formData.coverPageType === 'single-image' && (
                <Form.Control
                  name='imageNumber'
                  value={imageNumber}
                  className='d-inline'
                  style={{ maxWidth: 80 }}
                  as='select'
                  size='sm'
                  onChange={onChange}
                >
                  {pageList.map((page, index) => (
                    <option key={page._id}>{index + 1}</option>
                  ))}
                </Form.Control>
              )}
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onSubmit}>Apply</Button>
          <Button onClick={clickCancel}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

CoverPageForm.propTypes = {
  show: PropTypes.bool.isRequired,
  books: PropTypes.object.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  books: state.books
})

export default connect(mapStateToProps, {})(CoverPageForm)
