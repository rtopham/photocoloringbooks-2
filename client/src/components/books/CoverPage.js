import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Image, Card, Button } from 'react-bootstrap'
import CoverPageForm from './CoverPageForm'
import { updateCoverPage, updateCurrentPage } from '../../redux/actions/books'

const CoverPage = ({
  books: {
    current: {
      changesMade,
      coverPage,
      coverPage: {
        title,
        textLine1,
        textLine2,
        textLine3,
        footer,
        imageNumber,
        coverPageType
      },
      pageList
    }
  },
  pages: { gallery },
  updateCoverPage,
  updateCurrentPage
}) => {
  const [showModal, setShowModal] = useState(false)
  const clickEdit = () => {
    setShowModal(!showModal)
  }

  const handleCancel = () => {
    setShowModal(false)
  }
  const handleSave = (formData) => {
    updateCoverPage(formData)
    setShowModal(false)
    updateCurrentPage({ changesMade: true })
  }

  const divStyles =
    'd-flex justify-content-center text-center align-items-center'
  const divStyles2 = 'justify-content-center text-center align-items-center'

  return (
    <>
      <Card className='mb-2'>
        <div
          style={{ height: 700, width: 540 }}
          className='mx-auto text-center'
        >
          <div style={{ height: '5%' }} className='light'>
            <span className='float-right'>
              {' '}
              <Button variant='link' size='sm' onClick={clickEdit}>
                <i className='fa fa-edit'></i>
              </Button>
            </span>
          </div>
          <div style={{ height: '35%' }} className={divStyles2 + 'secondary'}>
            {coverPageType === 'single-image' && (
              <Image
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%'
                }}
                src={`/pages/${pageList[imageNumber - 1].filename}`}
              />
            )}
            {coverPageType === 'collage' &&
              pageList.map((page) => (
                <Image
                  style={{
                    maxWidth: '200px',
                    maxHeight: '133px'
                  }}
                  src={`/pages/${page.filename}`}
                  key={page._id}
                />
              ))}
          </div>
          <div style={{ height: '20%' }} className={divStyles + 'light'}>
            <h1>{changesMade ? title : '[Title]'}</h1>
          </div>
          <div style={{ height: '10%' }} className={divStyles + 'secondary'}>
            <h6>{changesMade ? textLine1 : '[Text Line 1]'}</h6>
          </div>
          <div style={{ height: '10%' }} className={divStyles + 'light'}>
            <h6>{changesMade ? textLine2 : '[Text Line 2]'}</h6>
          </div>
          <div style={{ height: '10%' }} className={divStyles + 'secondary'}>
            <h6>{changesMade ? textLine3 : '[Text Line 3]'}</h6>
          </div>
          <div style={{ height: '10%' }} className={divStyles + 'light'}>
            {footer}
          </div>
        </div>
      </Card>
      <CoverPageForm
        coverPage={coverPage}
        show={showModal}
        handleCancel={handleCancel}
        handleSave={handleSave}
      />
    </>
  )
}

const mapStateToProps = (state) => ({
  books: state.books,
  pages: state.pages
})

export default connect(mapStateToProps, { updateCoverPage, updateCurrentPage })(
  CoverPage
)
