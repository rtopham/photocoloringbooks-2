import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import NotFound from '../layout/NotFound'
import Register from '../auth/Register'
import Login from '../auth/Login'
import PasswordResetRequest from '../auth/PasswordResetRequest'
import ResetPassword from '../auth/ResetPassword'
import Alert from '../layout/Alert'
import Dashboard from '../dashboard/Dashboard'
import Pages from '../pages/Pages'
import Gallery from '../pages/Gallery'

const Routes = () => {
  return (
    <Fragment>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route
          exact
          path='/password-reset-request'
          component={PasswordResetRequest}
        />
        <Route exact path='/reset-password/:token' component={ResetPassword} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/pages' component={Pages} />
        <PrivateRoute exact path='/gallery' component={Gallery} />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  )
}

export default Routes
