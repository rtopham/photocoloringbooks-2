import React from 'react'
import {
  Container,
  Card,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Tabs,
  Tab,
  Spinner
} from 'react-bootstrap'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EditProfile from './EditProfile'
import EditPassword from './EditPassword'

const Dashboard = ({ auth: { user } }) => {
  if (user === null)
    return (
      <Spinner
        animation='border'
        variant='primary'
        className='d-block mx-auto'
      />
    )
  const { avatar, name, email, date, _id } = user

  return (
    <Container>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> {user && user.name}
      </p>
      <Card>
        <Card.Body>
          <Row>
            <Col>
              <img src={avatar} alt='' />
            </Col>
            <Col>
              <ListGroup>
                <ListGroupItem>{name}</ListGroupItem>
                <ListGroupItem>{email}</ListGroupItem>
                <ListGroupItem>Joined: {date.substring(0, 10)}</ListGroupItem>
                <ListGroupItem>User Id: {_id}</ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
          <Row></Row>
        </Card.Body>
      </Card>
      <div className='mt-3'>
        <Tabs defaultActiveKey='profile' id='tabs'>
          <Tab eventKey='profile' title='Edit Profile'>
            <div className='mt-3'>
              <EditProfile />
            </div>
          </Tab>
          <Tab eventKey='password' title='Change Password'>
            <div className='mt-3'>
              <EditPassword />
            </div>
          </Tab>
        </Tabs>
      </div>
    </Container>
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, {})(Dashboard)
