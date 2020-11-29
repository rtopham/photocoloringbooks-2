import React from 'react'
import { connect } from 'react-redux'
import PublicEditImage from '../image/PublicEditImage'
import PageForm from '../pages/PageForm'

const Pages = ({ auth: { user } }) => {
  return (
    <section className='container'>
      <h1 className='d-inline text-primary'>Pages</h1>{' '}
      {/*       <p className='d-inline lead'>
        <i className='fas fa-user'></i> {user && user.name}
      </p> */}
      <PublicEditImage />
      <PageForm />
    </section>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, {})(Pages)
