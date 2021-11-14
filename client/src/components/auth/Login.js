import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { login } from '../../redux/actions/auth'
import {
  Card,
  Form,
  FormGroup,
  FormLabel,
  Container,
  FormControl
} from 'react-bootstrap'
import { validateEmail, validatePassword } from '../../lib/form-validation'
import PropTypes from 'prop-types'

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  const validateForm = () => {
    return (
      validateEmail(email) === 'success' &&
      validatePassword(password) === 'success'
    )
  }

  //Redirect if logged in

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <Container fluid className='authForms'>
      <Card border='dark' text='dark'>
        <Card.Header>
          <h1>
            <span>
              <i className='fas fa-user' /> Sign In
            </span>
          </h1>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={onSubmit}>
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
            </FormGroup>

            <input
              type='submit'
              value='Login'
              disabled={!validateForm()}
              className='btn btn-dark btn-block'
            />
          </Form>
          <p></p>
          <p className='text-center'>
            Don't have an account? <Link to='/register'>Sign Up</Link>
          </p>
          <p className='text-center'>
            <Link to='/password-reset-request'>Forgot password?</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
