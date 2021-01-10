import React from 'react'
import { connect } from 'react-redux'
import { Card, Image, Button, Col, Row } from 'react-bootstrap'
import {
  openDeleteModal,
  openEditModal,
  setCurrentBook
} from '../../redux/actions/books'

import { updatePageList } from '../../redux/actions/books'

const BooksGalleryImage = ({
  book,
  pages: { gallery },
  openDeleteModal,
  openEditModal,
  setCurrentBook
}) => {
  const styleObject = {
    maxWidth: '80px',
    maxHeight: '52px'
  }

  const clickEdit = () => {
    setCurrentBook(book)
    openEditModal()
  }

  const clickDelete = () => {
    setCurrentBook(book)
    openDeleteModal()
  }

  const thumbArray = gallery.filter((page) => book.pages.includes(page._id))

  return (
    <>
      <Card style={{ maxHeight: '235px' }}>
        <Row>
          <Col>
            {thumbArray.map((page, index) => {
              if (index < 3)
                return (
                  <Image
                    thumbnail
                    src={`/pages/${page.filename}`}
                    className={'mr-3 mb-3'}
                    style={styleObject}
                    key={page._id}
                  />
                )
              else return null
            })}
            <span>. . .</span>
          </Col>
          <Col md='auto'>
            <div className='float-right mr-2'>
              <h6>{book.title}</h6>
              <h6>{book.date && book.date.substring(0, 10)}</h6>

              <br />
              <br />
              <br />
              <br />
              <br />
              <span className='float-right'>
                {' '}
                <Button variant='link' size='sm' onClick={clickEdit}>
                  <i className='fa fa-edit'></i>
                </Button>
                <Button variant='link' size='sm' onClick={clickDelete}>
                  <i className='fa fa-trash'></i>
                </Button>
              </span>
            </div>
          </Col>
        </Row>
      </Card>
    </>
  )
}

const mapStateToProps = (state) => ({
  pages: state.pages,
  pageList: state.books.current.pageList,
  books: state.books
})

export default connect(mapStateToProps, {
  setCurrentBook,
  openEditModal,
  openDeleteModal,
  updatePageList
})(BooksGalleryImage)
