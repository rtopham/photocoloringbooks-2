import React, { useEffect } from 'react'
import { Image } from 'react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const GoogleAd = ({ stripe: { subscription }, setDivClass, show }) => {
  useEffect(() => {
    if (
      show === true &&
      process.env.REACT_APP_ADS &&
      process.env.REACT_APP_MODE !== 'development'
    )
      (window.adsbygoogle = window.adsbygoogle || []).push({})
  }, [show])

  useEffect(() => {
    if (show === false || (subscription && subscription.status === 'active'))
      setDivClass('contentDiv')
    else if (
      !subscription ||
      (subscription && subscription.status !== 'active')
    )
      setDivClass('contentDivAds')
    if (process.env.REACT_APP_MODE === 'development')
      setDivClass('contentDivAdsDev')
  }, [show, subscription, setDivClass])

  let adContent = (
    <div className='mb-4 googleAdSize'>
      <Image
        fluid
        src='https://storage.googleapis.com/support-kms-prod/SNP_59D432450939ECC60A21BEDBEE985B1817B1_3094744_en_v2'
      />
    </div>
  )

  if (
    process.env.REACT_APP_ADS &&
    process.env.REACT_APP_MODE !== 'development'
  ) {
    adContent = (
      <div className=''>
        <ins
          className='adsbygoogle mb-4 googleAdSize'
          style={{ display: 'block' }}
          data-ad-client='ca-pub-7288454427087847'
          data-ad-slot='6536318459'
          data-ad-format='auto'
          /* data-full-width-responsive='true' */
        ></ins>
      </div>
    )
  }

  if (show === false) {
    return null
  }

  if (!subscription || (subscription && subscription.status !== 'active')) {
    return adContent
  }

  return null
}

GoogleAd.propTypes = {
  stripe: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  stripe: state.stripe
})

export default connect(mapStateToProps)(GoogleAd)
