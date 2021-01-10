import React from 'react'
import { connect } from 'react-redux'
import PublicEditImage from '../image/PublicEditImage'
import CreatePageForm from './CreatePageForm'

const Create = ({ auth: { user } }) => {
  return (
    <section className='container'>
      <h1 className='d-inline text-primary'>Create Pages</h1>{' '}
      <PublicEditImage />
      <CreatePageForm />
    </section>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, {})(Create)
