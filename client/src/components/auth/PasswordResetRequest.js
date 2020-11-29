import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { requestPasswordReset } from '../../redux/actions/auth'
import {
  Card,
  Form,
  FormGroup,
  FormLabel,
  Container,
  FormControl
} from 'react-bootstrap'
import { validateEmail } from '../../lib/form-validation'
import PropTypes from 'prop-types'

const PasswordResetRequest = ({ requestPasswordReset, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: ''
  })

  const { email } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    requestPasswordReset(email)
    setFormData({ ...formData, email: '' })
  }

  const validateForm = () => {
    return validateEmail(email) === 'success'
  }

  //Redirect if logged in

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

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
              Enter the email address associated with your account to receive a
              password reset email.
            </FormGroup>
            <FormGroup>
              <FormLabel>Email Address</FormLabel>
              <FormControl
                type='email'
                name='email'
                value={email}
                isValid={validateEmail(email) === 'success'}
                isInvalid={validateEmail(email) === 'error'}
                onChange={onChange}
                required
                minLength='6'
              />
            </FormGroup>

            <input
              type='submit'
              value='Send Email'
              disabled={!validateForm()}
              className='btn btn-primary btn-block'
            />
          </Form>
          <p></p>

          <p className='text-center'>
            <Link to='/login'>Cancel</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  )
}

PasswordResetRequest.propTypes = {
  requestPasswordReset: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { requestPasswordReset })(
  PasswordResetRequest
)
