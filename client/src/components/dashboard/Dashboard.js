import React from 'react'
import {
  Container,
  Card,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Tabs,
  Tab
} from 'react-bootstrap'
import { connect } from 'react-redux'
import EditProfile from './EditProfile'
import EditPassword from './EditPassword'
import DeleteAccount from './DeleteAccount'
import MyPlan from './MyPlan'
import PropTypes from 'prop-types'
import GoogleAd from '../layout/GoogleAd'

const Dashboard = ({ auth: { user } }) => {
  const { avatar, name, email, date, _id } = user

  return (
    <Container>
      <GoogleAd />
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
        <Tabs defaultActiveKey='plan' id='tabs'>
          <Tab eventKey='plan' title='My Plan'>
            <div className='mt-3'>
              <MyPlan />
            </div>
          </Tab>
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
          <Tab eventKey='account' title='Delete Account'>
            <div className='mt-3'>
              <DeleteAccount />
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
