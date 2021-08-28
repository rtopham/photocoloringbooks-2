import React, { useState } from 'react'
import EditImage from '../image/EditImage'
import CreatePageForm from './CreatePageForm'
import GalleryLimitModal from './GalleryLimitModal'
import GoogleAd from '../layout/GoogleAd'

const Create = () => {
  const [showLimitModal, setShowLimitModal] = useState(false)

  return (
    <div className='container'>
      <GoogleAd />
      <h1 className='d-inline text-primary'>Create Pages</h1>{' '}
      <EditImage setShowLimitModal={setShowLimitModal} />
      <CreatePageForm />
      <GalleryLimitModal
        show={showLimitModal}
        setShowLimitModal={setShowLimitModal}
      />
    </div>
  )
}

export default Create
