import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import pages from './pages'

export default combineReducers({
  alert,
  auth,
  pages
})
