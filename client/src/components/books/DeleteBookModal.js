import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Image } from 'react-bootstrap'
import { deleteBook, closeDeleteModal } from '../../redux/actions/books'
import PropTypes from 'prop-types'

const DeleteBookModal = ({
  books: { current, deleteModalShow },
  gallery,
  deleteBook,
  closeDeleteModal
}) => {
  const clickDelete = () => {
    deleteBook(current._id)
  }

  const thumbArray = gallery.filter((page) => current.pages.includes(page._id))

  if (!current) return null
  return (
    <Modal centered show={deleteModalShow}>
      <Modal.Header>
        <Modal.Title>Delete Book</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {thumbArray.map((page, index) => {
          if (index < 3)
            return (
              <Image
                thumbnail
                src={`/api/pages/url/${page.filename}`}
                className={'mr-3 mb-3'}
                style={{ maxWidth: '80px', maxHeight: '52px' }}
                key={page._id}
              />
            )
          else return null
        })}
        <span>. . .</span>
        <div className='mr-2'>
          <h6>{current.title}</h6>
          <h6>{current.date.substring(0, 10)}</h6>
        </div>
        <div className='float-left'>
          Deleting this book will not delete any of the included pages.
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={closeDeleteModal}>Cancel</Button>
        <Button onClick={clickDelete}>Delete</Button>
      </Modal.Footer>
    </Modal>
  )
}

DeleteBookModal.propTypes = {
  books: PropTypes.object.isRequired,
  gallery: PropTypes.array.isRequired,
  deleteBook: PropTypes.func.isRequired,
  closeDeleteModal: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  books: state.books,
  gallery: state.pages.gallery
})

export default connect(mapStateToProps, { deleteBook, closeDeleteModal })(
  DeleteBookModal
)
