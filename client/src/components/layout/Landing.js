import React from 'react'
import { Container } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import FakeGoogleAd from './GoogleAd'
import PublicEditImage from '../image/PublicEditImage'
import PropTypes from 'prop-types'

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <Container>
      <FakeGoogleAd />
      <PublicEditImage />
    </Container>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing)
