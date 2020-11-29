import React from 'react'
import { connect } from 'react-redux'
import {
  Modal,
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormControl
} from 'react-bootstrap'
import { closeModal, savePage } from '../../redux/actions/pages'

const formData = new FormData()

const PageForm = ({ pages: { modalShow, srcBlob }, closeModal, savePage }) => {
  const { caption, tags } = formData

  const onChange = (e) => formData.set([e.target.name], e.target.value)

  const onSubmit = (e) => {
    e.preventDefault()
    formData.set('page', srcBlob)
    savePage(formData)
  }

  return (
    <Modal
      show={modalShow}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Add Caption and Tags
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Do you want to add a caption and/or tags for this page?</h4>
        <Form onSubmit={onSubmit}>
          <FormGroup controlId='caption'>
            <FormLabel>Caption</FormLabel>
            <FormControl
              autoFocus
              name='caption'
              value={caption}
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup controlId='tags'>
            <FormLabel>Tags</FormLabel>
            <FormControl
              placeholder='Enter one or more tags for this page separated by spaces.'
              name='tags'
              value={tags}
              onChange={onChange}
            />
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onSubmit}>Save</Button>
        <Button onClick={closeModal}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}

const mapStateToProps = (state) => ({
  pages: state.pages
})

export default connect(mapStateToProps, { closeModal, savePage })(PageForm)
