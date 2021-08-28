import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Card, Image, Button, Col, Row } from 'react-bootstrap'
import { openDeleteModal, setCurrentBook } from '../../redux/actions/books'

import { updatePageList } from '../../redux/actions/books'
import { bookPDF } from '../../pdf/bookPdf'
import PropTypes from 'prop-types'

const BooksGalleryImage = ({
  book,
  pages: { gallery },
  openDeleteModal,
  setCurrentBook,
  updatePageList,
  pdfDisabled
}) => {
  const styleObject = {
    maxWidth: '80px',
    maxHeight: '52px'
  }

  const [redirect, setRedirect] = useState(false)

  const clickEdit = () => {
    setCurrentBook(book)
    const newPageList = gallery.filter((page) => book.pages.includes(page._id))
    updatePageList(newPageList)
    setRedirect(true)
  }

  const clickDelete = () => {
    setCurrentBook(book)
    openDeleteModal()
  }

  const clickPDF = () => {
    bookPDF(
      book,
      gallery.filter((page) => book.pages.includes(page._id))
    )
  }

  const thumbArray = gallery.filter((page) => book.pages.includes(page._id))

  if (redirect) return <Redirect to='books/edit' />

  return (
    <Card style={{ height: '200px' }}>
      <Row>
        <Col>
          {thumbArray.map((page, index) => {
            if (index < 3)
              return (
                <Image
                  thumbnail
                  //                src={`/pages/${page.filename}`}
                  src={`${process.env.REACT_APP_IMAGE_URL}${page.filename}`}
                  className={'mr-3 mb-3'}
                  style={styleObject}
                  key={page._id}
                />
              )
            else return null
          })}
          <span>. . .</span>
        </Col>
        <Col>
          <div className='float-right mr-2 galleryImageBox'>
            <h6>{book.title}</h6>
            <h6>{book.date && book.date.substring(0, 10)}</h6>
            <Button disabled={pdfDisabled} onClick={clickPDF}>
              Create PDF
            </Button>
            {book.title.length < 10 && <br />}
            {book.title.length < 15 && <br />}
            <br />
            <br />
            <br />
            <span className='float-right'>
              {' '}
              <Button
                variant='link'
                size='sm'
                onClick={clickEdit}
                className='editIcon'
              >
                <i className='fa fa-edit'></i>
              </Button>
              <Button
                variant='link'
                size='sm'
                onClick={clickDelete}
                className='deleteIcon'
              >
                <i className='fa fa-trash'></i>
              </Button>
            </span>
          </div>
        </Col>
      </Row>
    </Card>
  )
}

BooksGalleryImage.propTypes = {
  book: PropTypes.object.isRequired,
  pages: PropTypes.object.isRequired,
  setCurrentBook: PropTypes.func.isRequired,
  openDeleteModal: PropTypes.func.isRequired,
  updatePageList: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  pages: state.pages
})

export default connect(mapStateToProps, {
  setCurrentBook,
  openDeleteModal,
  updatePageList
})(BooksGalleryImage)
