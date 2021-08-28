import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Modal,
  Button,
  Badge,
  Form,
  FormGroup,
  FormLabel,
  FormControl
} from 'react-bootstrap'
import { closeEditModal, savePage } from '../../redux/actions/pages'
import PropTypes from 'prop-types'

const uploadFormData = new FormData()

const CreatePageForm = ({
  pages: { editModalShow, srcBlob },
  closeEditModal,
  savePage
}) => {
  const initialState = {
    caption: '',
    tag: '',
    tagArray: []
  }

  const [formData, setFormData] = useState(initialState)

  useEffect(() => {}, [])

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (e.target.value.startsWith(' '))
      setFormData({ ...formData, [e.target.name]: '' })
  }

  const keyPress = (e) => {
    if (e.key === 'Enter') {
      let newTagArray = formData.tagArray
      newTagArray.push(e.target.value)
      setFormData({ ...formData, tag: '', tagArray: newTagArray })
    }
  }

  const clickCancel = (e) => {
    // e.preventDefault()
    setFormData(initialState)
    closeEditModal()
  }

  const clickDeleteTag = (e) => {
    e.preventDefault()
    let newTagArray = formData.tagArray
    newTagArray.splice(e.target.id, 1)
    setFormData({ ...formData, tag: '', tagArray: newTagArray })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    uploadFormData.set('caption', formData.caption)
    uploadFormData.set('tags', JSON.stringify(formData.tagArray))
    uploadFormData.set('page', srcBlob)
    savePage(uploadFormData)
    setFormData(initialState)

    //savePage(page)
  }

  const { caption, tag } = formData
  return (
    <Modal
      show={editModalShow}
      onHide={clickCancel}
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
            <FormLabel>
              Tags{' '}
              {formData.tagArray.map((tag, index) => (
                <Button key={index} variant='link' size='sm'>
                  <Badge pill variant='primary'>
                    {tag}{' '}
                    <i
                      onClick={clickDeleteTag}
                      id={index}
                      className='fas fa-times-circle'
                    />
                  </Badge>
                </Button>
              ))}
            </FormLabel>
            <FormControl
              placeholder='Enter a tag and "Enter" to add.'
              name='tag'
              value={tag}
              onChange={onChange}
              onKeyPress={keyPress}
            />
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onSubmit}>Save</Button>
        <Button onClick={clickCancel}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}

CreatePageForm.propTypes = {
  pages: PropTypes.object.isRequired,
  closeEditModal: PropTypes.func.isRequired,
  savePage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  pages: state.pages
})

export default connect(mapStateToProps, { closeEditModal, savePage })(
  CreatePageForm
)
