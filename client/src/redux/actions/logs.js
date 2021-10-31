import api from '../../utils/api'

export const recordLog = (logData) => async (dispatch) => {
  try {
    const res = await api.post('/logs', logData)

    //      dispatch({ type: SAVE_PAGE, payload: res.data })
    //      dispatch(setAlert('Page Saved to Gallery', 'success'))
    //      dispatch(loadGallery())
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      //errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
      console.log('error in try catch')
      errors.forEach((error) => console.log(error.msg))
    }
  }
}
