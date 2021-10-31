const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
  //Get log secret from header
  const secret = req.header('log-secret')

  //Check if no secret
  if (!secret) {
    return res
      .status(401)
      .json({ msg: 'Authorization denied, no logggin credentials.' })
  }

  //Verify secret
  try {
    const logSecret = config.get('logSecret')
    if (secret !== logSecret)
      return res
        .status(401)
        .json({ msg: 'Auhorization denied, invalid logging credentials.' })
  } catch (err) {
    res
      .status(401)
      .json({ msg: 'Authorization denied, logging auhorization error.' })
  }

  //Get token from header--token not required to log, but will add user Id to req and log
  const token = req.header('x-auth-token')
  if (token) {
    try {
      const decoded = jwt.verify(token, config.get('jwtSecret'))
      req.user = decoded.user
    } catch (err) {
      //res.status(401).json({msg: 'Token is not valid'})
    }
  }
  next()
}
