import api from './api'

const setLogSecretHeader = (secret) => {
  if (secret) {
    api.defaults.headers.common['log-secret'] = secret
  } else {
    delete api.defaults.headers.common['log-secret']
  }
}

export default setLogSecretHeader
