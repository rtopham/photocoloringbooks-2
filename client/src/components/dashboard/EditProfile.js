import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { validateInputLength, validateEmail } from '../../lib/form-validation'
import EditSubmitCancel from './EditSubmitCancel'
import { updateUser } from '../../redux/actions/auth'
import PropTypes from 'prop-types'

const EditProfile = ({ auth: { user }, updateUser }) => {
  const initialState = {
    name: '',
    email: ''
  }

  const [formData, setFormData] = useState(initialState)
  const [edit, toggleEditState] = useState(false)

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email
    })
    //eslint-disable-next-line
  }, [])

  const { name, email } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    updateUser(formData)
    toggleEditState(false)
  }

  const toggleEdit = (e) => {
    toggleEditState(!edit)
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup controlId='name'>
        <FormLabel>Name</FormLabel>
        <FormControl
          autoFocus
          isValid={validateInputLength(name, 2) === 'success'}
          isInvalid={validateInputLength(name, 2) === 'error'}
          name='name'
          type='name'
          value={name}
          disabled={!edit}
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup controlId='email'>
        <FormLabel>Email</FormLabel>
        <FormControl
          isValid={validateEmail(email) === 'success'}
          isInvalid={validateEmail(email) === 'error'}
          name='email'
          type='email'
          value={email}
          disabled={!edit}
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup>
        <EditSubmitCancel
          edit={edit}
          validated={
            validateInputLength(name, 2) === 'success' &&
            validateEmail(email) === 'success' &&
            (name !== user.name || email !== user.email)
          }
          toggleEdit={toggleEdit}
        />
      </FormGroup>
    </Form>
  )
}

EditProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { updateUser })(EditProfile)
