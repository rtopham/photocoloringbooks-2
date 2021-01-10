import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Image, Card, Button, Form } from 'react-bootstrap'
import {
  setPageIndex,
  updateCurrentPage,
  saveBook
} from '../../redux/actions/books'
import CoverPage from './CoverPage'

const BookPreview = ({
  books: {
    current: {
      coverPage: {
        title,
        textLine1,
        textLine2,
        textLine3,
        coverPage,
        coverPageType,
        footer
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
  const [showCoverPage, setShowCoverPage] = useState(false)

  const clickLeft = (e) => {
    if (pageIndex === 0) setShowCoverPage(true)
    if (pageIndex > 0) setPageIndex(pageIndex - 1)
  }

  const clickRight = (e) => {
    if (showCoverPage) setShowCoverPage(false)
    else {
      if (pageIndex < pageList.length - 1) setPageIndex(pageIndex + 1)
    }
  }

  const clickSave = (e) => {
    const book = {
      title: title || 'Untitled',
      pages: pageList.map((page) => page._id),
      coverPage: {
        title: title || '',
        textLine1: textLine1,
        textLine2: textLine2,
        textLine3: textLine3,
        coverPage: coverPage,
        coverPageType: coverPageType,
        footer: footer
      }
    }
    saveBook(book)
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
      setShowCoverPage(true)
      updateCurrentPage(newValues)
    }
    if (e.currentTarget.id === 'coverPage' && !e.target.checked) {
      const newValues = {
        coverPage: {
          coverPage: false
        },
        pageIndex: 0
      }
      setShowCoverPage(false)
      updateCurrentPage(newValues)
    }
  }

  return (
    <>
      <Card className='mb-2'>
        <div style={{ minHeight: 710 }} className='mx-auto'>
          {coverPage && showCoverPage && pageIndex === 0 ? (
            <CoverPage />
          ) : (
            <Image
              thumbnail
              className='mr-1 mb-1'
              style={{
                maxWidth: '800px',
                maxHeight: '600px'
              }}
              src={`/pages/${pageList[pageIndex].filename}`}
            />
          )}
          {captions && !showCoverPage && (
            <div className='text-center'>{pageList[pageIndex].caption}</div>
          )}
          {pageNumbers && !showCoverPage && (
            <div className='text-center'>{pageIndex + 1}</div>
          )}
        </div>

        <Card.Footer className='text-center'>
          <Button
            onClick={clickLeft}
            variant='link'
            disabled={(pageIndex === 0 && !coverPage) || showCoverPage}
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

            <Form.Check
              inline
              label='Cover page'
              id='coverPage'
              type='checkbox'
              onChange={handleCheck}
              checked={coverPage}
            />
          </div>{' '}
          <div className='float-right'>
            <Button onClick={clickSave}>
              <i className='fas fa-save mr-1' /> Save Book
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </>
  )
}

const mapStateToProps = (state) => ({
  books: state.books,
  pages: state.pages
})

export default connect(mapStateToProps, {
  setPageIndex,
  updateCurrentPage,
  saveBook
})(BookPreview)
