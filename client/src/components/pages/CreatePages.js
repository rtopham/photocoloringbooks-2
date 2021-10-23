import React, { useState } from 'react'

import EditImage from '../image/EditImage'
import CreatePageForm from './CreatePageForm'
import GalleryLimitModal from './GalleryLimitModal'
import GoogleAd from '../layout/GoogleAd'
import Instructions from './Instructions'

const Create = () => {
  const [showLimitModal, setShowLimitModal] = useState(false)

  const [resetAfterSave, setResetAfterSave] = useState(false)

  return (
    <div className='container'>
      <GoogleAd />
      <h1 className='d-inline text-primary'>Create Pages</h1>{' '}
      <EditImage
        setShowLimitModal={setShowLimitModal}
        resetAfterSave={resetAfterSave}
        setResetAfterSave={setResetAfterSave}
      />
      <Instructions />
      <CreatePageForm setResetAfterSave={setResetAfterSave} />
      <GalleryLimitModal
        show={showLimitModal}
        setShowLimitModal={setShowLimitModal}
      />
    </div>
  )
}

export default Create
