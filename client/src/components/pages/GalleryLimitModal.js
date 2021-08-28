import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import GalleryUpgradeNotice from './GalleryUpgradeNotice'
import PropTypes from 'prop-types'
import GalleryFullNotice from './GalleryFullNotice'

function GalleryLimitModal({
  show,
  setShowLimitModal,
  auth: { user },
  pages: { gallery }
}) {
  const clickClose = () => {
    setShowLimitModal(false)
  }
  return (
    <Modal centered show={show}>
      <Modal.Header>
        <Modal.Title>Gallery Full</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {!user.stripeSubscriptionId && gallery.length >= user.galleryLimit && (
          <GalleryUpgradeNotice />
        )}
        {user.stripeSubscriptionId && gallery.length >= user.galleryLimit && (
          <GalleryFullNotice />
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={clickClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

GalleryLimitModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShowLimitModal: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  pages: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  pages: state.pages
})

export default connect(mapStateToProps, {})(GalleryLimitModal)
