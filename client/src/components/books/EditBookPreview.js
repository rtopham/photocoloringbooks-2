import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Image, Card, Button, Form } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import {
  setPageIndex,
  updateCurrentPage,
  saveBook
} from '../../redux/actions/books'
import CoverPage from './CoverPage'
import NewBookHeader from './NewBookHeader'
import PropTypes from 'prop-types'

const EditBookPreview = ({
  books: {
    current,
    current: {
      coverPage: {
        title,
        textLine1,
        textLine2,
        textLine3,
        coverPage,
        coverPageType,
        footer,
        imageNumber
      },
      pageList,
      pageIndex,
      pageNumbers,
      captions
    }
  },
  setPageIndex,
  updateCurrentPage,
  saveBook
}) => {
  const [redirect, setRedirect] = useState(false)

  const clickLeft = (e) => {
    //    if (pageIndex === 0) setShowCoverPage(true)
    if (pageIndex > -1) setPageIndex(pageIndex - 1)
  }

  const clickRight = (e) => {
    //    if (showCoverPage) setShowCoverPage(false)

    if (pageIndex < pageList.length - 1) setPageIndex(pageIndex + 1)
  }

  const clickSave = (e) => {
    let book = {
      title: title || 'Untitled',
      pages: pageList.map((page) => page._id),
      tags: [],
      likes: [],
      comments: [],
      captions: captions,
      pageNumbers: pageNumbers,
      coverPage: {
        title: title || '',
        textLine1: textLine1,
        textLine2: textLine2,
        textLine3: textLine3,
        coverPage: coverPage,
        coverPageType: coverPageType,
        footer: footer,
        imageNumber: imageNumber
      }
    }
    if (current._id) book._id = current._id
    saveBook(book)
    setRedirect(true)
  }

  const handleCheck = (e) => {
    updateCurrentPage({ [e.currentTarget.id]: e.target.checked })

    if (e.currentTarget.id === 'coverPage' && e.target.checked) {
      const newValues = {
        coverPage: {
          coverPage: true
        },
        pageIndex: 0
      }
      updateCurrentPage(newValues)
    }
    if (e.currentTarget.id === 'coverPage' && !e.target.checked) {
      const newValues = {
        coverPage: {
          coverPage: false
        },
        pageIndex: 0
      }

      updateCurrentPage(newValues)
    }
  }
  if (redirect) return <Redirect to='/books' />

  if (pageList.length === 0) return <Redirect to='/books/create' />
  return (
    <>
      <div className='container'>
        <div className='mb-4'>
          <NewBookHeader
            heading='Edit Book: Preview'
            backLink='/books/edit/cover'
            buttonCallBack={clickSave}
            buttonText='Save Book'
          />
        </div>
      </div>

      <Card className='mb-2'>
        <div style={{ minHeight: 710 }} className='mx-auto'>
          {pageIndex === -1 ? (
            <CoverPage preview={true} />
          ) : (
            <Image
              thumbnail
              className='mr-1 mb-1'
              style={{
                maxWidth: '800px',
                maxHeight: '600px'
              }}
              /* src={`/pages/${pageList[pageIndex].filename}`} */
              src={`${process.env.REACT_APP_IMAGE_URL}${pageList[pageIndex].filename}`}
            />
          )}
          {captions && pageIndex > -1 && (
            <div className='text-center'>{pageList[pageIndex].caption}</div>
          )}
          {pageNumbers && pageIndex > -1 && (
            <div className='text-center'>{pageIndex + 1}</div>
          )}
        </div>

        <Card.Footer className='text-center'>
          <Button
            onClick={clickLeft}
            variant='link'
            disabled={pageIndex === -1}
          >
            <i className='fas fa-chevron-circle-left' />
          </Button>
          <Button
            onClick={clickRight}
            variant='link'
            disabled={pageIndex >= pageList.length - 1}
          >
            <i className='fas fa-chevron-circle-right' />
          </Button>
          <div className='mt-1'>
            <Form.Check
              inline
              label='Captions'
              id='captions'
              type='checkbox'
              onChange={handleCheck}
              checked={captions}
            />
            <Form.Check
              inline
              label='Page numbers'
              id='pageNumbers'
              type='checkbox'
              onChange={handleCheck}
              checked={pageNumbers}
            />
          </div>{' '}
        </Card.Footer>
      </Card>
    </>
  )
}

EditBookPreview.propTypes = {
  books: PropTypes.object.isRequired,
  setPageIndex: PropTypes.func.isRequired,
  updateCurrentPage: PropTypes.func.isRequired,
  saveBook: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  books: state.books
})

export default connect(mapStateToProps, {
  setPageIndex,
  updateCurrentPage,
  saveBook
})(EditBookPreview)
