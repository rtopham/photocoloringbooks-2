import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Image } from 'react-bootstrap'
import { deletePage, closeDeleteModal } from '../../redux/actions/pages'

const DeletePageModal = ({
  pages: { current, deleteModalShow },
  deletePage,
  closeDeleteModal
}) => {
  const clickDelete = () => {
    deletePage(current._id)
  }
  if (!current) return null
  return (
    <Modal centered show={deleteModalShow}>
      <Modal.Header>
        <Modal.Title>Delete Page</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Image
          thumbnail
          src={`/pages/${current.filename}`}
          className='mr-3 mb-3'
          style={{ maxWidth: '200px', maxHeight: '133px' }}
        />
        <div className='float-right mr-2'>
          <h6>{current.caption}</h6>
          <h6>{current.date.substring(0, 10)}</h6>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={closeDeleteModal}>Cancel</Button>
        <Button onClick={clickDelete}>Delete</Button>
      </Modal.Footer>
    </Modal>
  )
}

const mapStateToProps = (state) => ({
  pages: state.pages
})

export default connect(mapStateToProps, { deletePage, closeDeleteModal })(
  DeletePageModal
)
