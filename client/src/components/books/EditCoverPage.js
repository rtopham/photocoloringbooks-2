import React from 'react'
import { Card } from 'react-bootstrap'
import CoverPage from './CoverPage'
import NewBookHeader from './NewBookHeader'

const EditCoverPage = () => {
  return (
    <>
      <div className='container'>
        <div className='mb-4'>
          <NewBookHeader
            heading='Edit Book: Cover Page'
            backLink='/books/edit'
            forwardLink='/books/edit/preview'
            buttonText='Preview'
          />
        </div>
      </div>

      <Card className='mb-2'>
        <div style={{ minHeight: 710 }} className='mx-auto'>
          <CoverPage />
        </div>
      </Card>
    </>
  )
}

export default EditCoverPage
