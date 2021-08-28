import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { openDeleteAccountModal } from '../../redux/actions/auth'
import DeleteAccountModal from './DeleteAccountModal'
import PropTypes from 'prop-types'

const DeleteAccount = ({ openDeleteAccountModal }) => {
  const clickDelete = () => {
    openDeleteAccountModal()
  }

  return (
    <div>
      You may delete your account at any time. If you delete your account, all
      of your stored coloring books and pages will be deleted permanently and
      you will no longer be able to access your account. If you have an active
      subscription to the premium plan at the time you delete your account, your
      subscription will be terminated, and you will not recieve a refund for any
      portion of the unused subscription period.{' '}
      <div className='mt-3'>
        <Button variant='primary' onClick={clickDelete}>
          Delete Account
        </Button>
      </div>
      <DeleteAccountModal />
    </div>
  )
}

DeleteAccount.propTypes = {
  openDeleteAccountModal: PropTypes.func.isRequired
}

export default connect(null, {
  openDeleteAccountModal
})(DeleteAccount)
