import React from 'react'
import { Container } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import EditImage from '../image/EditImage'
import PropTypes from 'prop-types'
import Instructions from './Instructions'

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <Container>
      <EditImage />
      <Instructions />
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
