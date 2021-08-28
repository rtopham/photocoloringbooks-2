import React from 'react'
import UpgradeModal from './UpgradeModal'
import RenewalModal from './RenewalModal'
import UpdatePaymentModal from './UpdatePaymentModal'

const MyPlanModals = ({ mode, setMode }) => {
  switch (mode) {
    case 'upgrade':
      return <UpgradeModal setMode={setMode} />
    case 'renew':
      return <RenewalModal setMode={setMode} />
    case 'update':
      return <UpdatePaymentModal setMode={setMode} />
    default:
      return null
  }
}

export default MyPlanModals
