//React and Components
import React, { useEffect } from 'react'
import MainNavbar from './components/layout/MainNavbar'
import Routes from './components/Routing/Routes'

// Stripe.js Components
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

//React Router Components
import { BrowserRouter as Router, Route } from 'react-router-dom'

//Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { LOGOUT } from './redux/actions/types'
import { loadUser, setLoading } from './redux/actions/auth'

//Utils
import setAuthToken from './utils/setAuthToken'

import './App.css'

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`)

const App = () => {
  useEffect(() => {
    //check for token in local storage
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
    if (localStorage.token) {
      store.dispatch(setLoading(true))
      store.dispatch(loadUser())
    } else store.dispatch(setLoading(false))

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT })
    })
  }, [])

  return (
    <Elements stripe={stripePromise}>
      <Provider store={store}>
        <Router>
          <MainNavbar />
          <Route component={Routes} />
        </Router>
      </Provider>
    </Elements>
  )
}

export default App
