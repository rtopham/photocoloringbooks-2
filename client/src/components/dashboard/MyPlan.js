import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Table } from 'react-bootstrap'
import MyPlanModals from './MyPlanModals'
import PropTypes from 'prop-types'

const MyPlan = ({ stripe: { subscription } }) => {
  const [mode, setMode] = useState('null')

  const upgradePrice = '$5.95'

  const clickUpgrade = () => {
    setMode('upgrade')
  }

  const clickRenew = () => {
    setMode('renew')
  }

  let status = 'inactive'
  let endDate = null
  let canceledDate = null
  if (subscription) {
    status = subscription.status
    endDate = new Date(subscription.current_period_end * 1000).toDateString()
    canceledDate = new Date(subscription.canceled_at * 1000).toDateString()
  }

  return (
    <div>
      <MyPlanModals mode={mode} setMode={setMode} />
      {status === 'active' && (
        <>
          <p>You have an active subscription to the premium plan.</p>{' '}
          <p>The features of your plan include:</p>
          <Table striped bordered hover size='sm'>
            <thead>
              <tr>
                <th style={{ width: '16%' }}>Feature</th>
                <th style={{ width: '42%' }}>Premium Plan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cost</td>

                <td>
                  One year for {upgradePrice} (no automatic renewals or
                  recurring charges. Renew only if you want to).
                </td>
              </tr>
              <tr>
                <td>Page Editor</td>

                <td>
                  Create and print unlimited coloring book pages from your
                  photos.
                </td>
              </tr>
              <tr>
                <td>Gallery Storage</td>

                <td>Up to 50 pages.</td>
              </tr>
              <tr>
                <td>Books</td>

                <td>Up to six books with up to 50 pages.</td>
              </tr>
              <tr>
                <td>Editing</td>

                <td>
                  Edit and delete your books and pages as often as you want.
                </td>
              </tr>
              <tr>
                <td>PDFs</td>

                <td>
                  Download and Share PDFs of your books as often as you want
                  during the subscription period.
                </td>
              </tr>
              <tr>
                <td>Ads</td>

                <td>No (during subscription period)</td>
              </tr>
            </tbody>
          </Table>
          <p>
            Your subscription will expire on <strong>{endDate}</strong>.
          </p>
          <p>
            Your pages and books will continue to be stored unless you delete
            your account. After {endDate}, you will need to renew your
            subscription to continue using PDF features and maintain add-free
            access to your pages and books. Your subscription will not renew
            automatically. Renew only if you want to.
          </p>
        </>
      )}
      {status === 'canceled' && (
        <>
          <p>
            Your subscription to the premium plan expired on {canceledDate}. You
            still have access to your pages and coloring books, but PDF features
            have been disabled. To restore PDF features and enjoy ad-free access
            to your pages and coloring books, please renew your subscription.
            You may renew your subscription for one-year for {upgradePrice}.
            Your subscription will not renew automatically. Renew only if you
            want to.
          </p>{' '}
          <Button onClick={clickRenew}>Renew Subscription</Button>
        </>
      )}
      {status !== 'active' && status !== 'canceled' && (
        <>
          <p>You are using the free plan.</p>
          <p>You can upgrade to the premium plan at any time:</p>
          <Table striped bordered hover size='sm'>
            <thead>
              <tr>
                <th style={{ width: '16%' }}>Feature</th>
                <th style={{ width: '42%' }}>Free Plan</th>
                <th style={{ width: '42%' }}>Premium Plan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cost</td>
                <td>Free</td>
                <td>
                  One year for {upgradePrice} (no automatic renewals or
                  recurring charges. Renew only if you want to).
                </td>
              </tr>
              <tr>
                <td>Page Editor</td>
                <td>
                  Create and print unlimited coloring book pages from your
                  photos.
                </td>
                <td>
                  Create and print unlimited coloring book pages from your
                  photos.
                </td>
              </tr>
              <tr>
                <td>Gallery Storage</td>
                <td>Up to 6 pages.</td>
                <td>Up to 50 pages.</td>
              </tr>
              <tr>
                <td>Books</td>
                <td>One book with up to six pages.</td>
                <td>Up to six books with up to 50 pages.</td>
              </tr>
              <tr>
                <td>Editing</td>
                <td>
                  Edit and delete your book and pages as often as you want.
                </td>
                <td>
                  Edit and delete your books and pages as often as you want.
                </td>
              </tr>
              <tr>
                <td>PDFs</td>
                <td>
                  Download and Share PDFs of your book as often as you want.
                </td>
                <td>
                  Download and Share PDFs of your books as often as you want
                  during the subscription period.
                </td>
              </tr>
              <tr>
                <td>Ads</td>
                <td>Yes</td>
                <td>No (during subscription period)</td>
              </tr>
            </tbody>
          </Table>
          <p>
            The premium plan is available for a yearly fee of {upgradePrice}. No
            automatic renewals or recurring charges, renew only if you want to.
          </p>
          <Button onClick={clickUpgrade}>Upgrade to Premium</Button>
        </>
      )}
    </div>
  )
}

MyPlan.propTypes = {
  stripe: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  stripe: state.stripe
})

export default connect(mapStateToProps, {})(MyPlan)
