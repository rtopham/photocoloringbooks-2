import React from 'react'
import { Container } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'
import NotFound from '../layout/NotFound'
import Register from '../auth/Register'
import Login from '../auth/Login'
import PasswordResetRequest from '../auth/PasswordResetRequest'
import ResetPassword from '../auth/ResetPassword'
import MainNavbar from '../layout/MainNavbar'
import Alert from '../layout/Alert'
import GoogleAd from '../layout/GoogleAd'
import Dashboard from '../dashboard/Dashboard'
import CreatePages from '../pages/CreatePages'
import Gallery from '../pages/Gallery'
import ColoringBooks from '../books/ColoringBooks'
import CreateBook from '../books/CreateBook'
import EditBook from '../books/EditBook'
import BookPreview from '../books/BookPreview'
import EditBookPreview from '../books/EditBookPreview'
import CreateCoverPage from '../books/CreateCoverPage'
import EditCoverPage from '../books/EditCoverPage'
import ViewPage from '../pages/ViewPage'
import Footer from '../layout/Footer'
import PrivacyPolicy from '../layout/PrivacyPolicy'
import TermsOfUse from '../layout/TermsOfUse'
import Landing from '../layout/Landing'
import Contact from '../layout/Contact'
import Admin from '../admin/Admin'

const Routes = () => {
  return (
    <>
      <MainNavbar />
      <Container>
        {/* <Route component={Alert} /> */}
        <Alert />
      </Container>
      <Container>
        <Switch>
          <Route exact path='/register' component={null} />

          <Route exact path='/login' component={null} />
          <Route exact path='/password-reset-request' component={null} />
          <Route exact path='/reset-password/:token' component={null} />
          <Route component={GoogleAd} />
        </Switch>
      </Container>

      <Container>
        <div className='contentDiv'>
          <Switch>
            {process.env.REACT_APP_NAV === 'true' && (
              <Route exact path='/register' component={Register} />
            )}

            <Route exact path='/login' component={Login} />

            <Route
              exact
              path='/password-reset-request'
              component={PasswordResetRequest}
            />
            <Route
              exact
              path='/reset-password/:token'
              component={ResetPassword}
            />
          </Switch>

          <Switch>
            <Route exact path='/register' component={null} />

            <Route exact path='/login' component={null} />
            <Route exact path='/password-reset-request' component={null} />
            <Route exact path='/reset-password/:token' component={null} />
            <Route exact path='/' component={Landing} />
            <Route exact path='/privacy-policy' component={PrivacyPolicy} />
            <Route exact path='/terms-of-use' component={TermsOfUse} />
            <Route exact path='/contact' component={Contact} />

            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/pages/:id' component={ViewPage} />
            <PrivateRoute exact path='/pages' component={CreatePages} />
            <PrivateRoute exact path='/gallery' component={Gallery} />
            <PrivateRoute exact path='/books/create' component={CreateBook} />
            <PrivateRoute exact path='/books/edit' component={EditBook} />
            <PrivateRoute
              exact
              path='/books/cover'
              component={CreateCoverPage}
            />
            <PrivateRoute
              exact
              path='/books/edit/cover'
              component={EditCoverPage}
            />
            <PrivateRoute exact path='/books/preview' component={BookPreview} />
            <PrivateRoute
              exact
              path='/books/edit/preview'
              component={EditBookPreview}
            />
            <PrivateRoute exact path='/books' component={ColoringBooks} />
            <AdminRoute exact path='/admin' component={Admin} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default Routes
