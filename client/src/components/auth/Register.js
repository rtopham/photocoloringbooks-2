import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { setAlert } from '../../redux/actions/alert'
import { register } from '../../redux/actions/auth'
import {
  Card,
  Form,
  FormGroup,
  FormLabel,
  Container,
  FormControl
} from 'react-bootstrap'
import {
  validateInputLength,
  validateEmail,
  validatePassword,
  validateConfirmPassword
} from '../../lib/form-validation'
import PropTypes from 'prop-types'

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger')
    } else {
      register({ name, email, password })
    }
  }

  const validateForm = () => {
    return (
      validateInputLength(name, 2) === 'success' &&
      validateEmail(email) === 'success' &&
      validatePassword(password) === 'success' &&
      validateConfirmPassword(password, password2) === 'success'
    )
  }

  if (isAuthenticated) {
    return <Redirect to='./dashboard' />
  }

  return (
    <Container fluid className='authForms'>
      <Card border='dark' text='dark'>
        <Card.Header>
          <h1>
            <span>
              <i className='fas fa-user' /> Register
            </span>
          </h1>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <FormLabel>Name</FormLabel>
              <FormControl
                type='text'
                name='name'
                isValid={validateInputLength(name, 2) === 'success'}
                isInvalid={validateInputLength(name, 2) === 'error'}
                value={name}
                onChange={onChange}
                required
              />
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
              value='Register'
              disabled={!validateForm()}
              className='btn btn-dark btn-block'
            />
          </Form>
          <p></p>
          <p className='text-center'>
            Already have an account? <Link to='/login'>Sign In</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register)
