//React and Components
import React, { Fragment, useEffect } from 'react'
import MainNavbar from './components/layout/MainNavbar'
import Landing from './components/layout/Landing'
import Routes from './components/Routing/Routes'

//React Router Components
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { LOGOUT } from './redux/actions/types'
import { loadUser, setLoading } from './redux/actions/auth'

//Utils
import setAuthToken from './utils/setAuthToken'

import './App.css'

const App = () => {
  useEffect(() => {
    //check for token in local storage
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
    if (localStorage.token) store.dispatch(loadUser())
    else store.dispatch(setLoading(false))

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT })
    })
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <MainNavbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
