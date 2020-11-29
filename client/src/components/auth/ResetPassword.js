import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { setAlert } from '../../redux/actions/alert'
import { resetUserPassword, checkResetToken } from '../../redux/actions/auth'

import {
  Card,
  Form,
  FormGroup,
  FormLabel,
  Container,
  FormControl
} from 'react-bootstrap'
import {
  validatePassword,
  validateConfirmPassword
} from '../../lib/form-validation'
import PropTypes from 'prop-types'

const ResetPassword = ({
  auth: { isAuthenticated, validResetToken },
  match,
  setAlert,
  resetUserPassword,
  checkResetToken
}) => {
  useEffect(() => {
    checkResetToken(match.params.token)
  }, [match.params.token, checkResetToken, validResetToken])

  const [formData, setFormData] = useState({
    password: '',
    password2: ''
  })

  const { password, password2 } = formData

  const [redirectToLogin, setRedirectToLogin] = useState(false)

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger')
    } else {
      resetUserPassword(match.params.token, formData.password)
      setRedirectToLogin(true)
    }
  }

  const validateForm = () => {
    return (
      validatePassword(password) === 'success' &&
      validateConfirmPassword(password, password2) === 'success'
    )
  }

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  if (redirectToLogin) {
    return <Redirect to='/login' />
  }

  if (!validResetToken)
    return (
      <Container className='w-50'>
        <Card>
          <Card.Header>
            <h1>
              <span className='text-primary'>
                <i className='fas fa-user' /> Reset Password
              </span>
            </h1>
          </Card.Header>
          <Card.Body>The reset token is not valid.</Card.Body>
          <p className='text-center'>
            <Link to='/password-reset-request'>
              Request a new password reset email?
            </Link>
          </p>
        </Card>
      </Container>
    )

  return (
    <Container className='w-50'>
      <Card>
        <Card.Header>
          <h1>
            <span className='text-primary'>
              <i className='fas fa-user' /> Reset Password
            </span>
          </h1>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <FormLabel>Password</FormLabel>
              <FormControl
                type='password'
                name='password'
                value={password}
                isValid={validatePassword(password) === 'success'}
                isInvalid={validatePassword(password) === 'error'}
                onChange={onChange}
                required
                minLength='6'
              />
              <span className='font-italic'>
                Password must contain at least eight characters, one uppercase
                letter, one lowercase letter and one number. Special characters
                are allowed.
              </span>
            </FormGroup>
            <FormGroup className='form-group'>
              <FormLabel htmlFor='password2'>Confirm Password</FormLabel>
              <FormControl
                type='password'
                name='password2'
                value={password2}
                isValid={
                  validateConfirmPassword(password, password2) === 'success'
                }
                isInvalid={
                  validateConfirmPassword(password, password2) === 'error'
                }
                onChange={onChange}
                required
              />
            </FormGroup>
            <input
              type='submit'
              value='Reset Password'
              disabled={!validateForm()}
              className='btn btn-primary btn-block'
            />
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

ResetPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  resetUserPassword: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  checkResetToken: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, {
  setAlert,
  resetUserPassword,
  checkResetToken
})(ResetPassword)
