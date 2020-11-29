const nodemailer = require('nodemailer')
const config = require('config')
const jwt = require('jsonwebtoken')

exports.getAccountAccessAttemptedMessage = (email) => {
  let message = {
    from: config.get('smtpUser'),
    to: email,
    subject: `${config.get('appProjectName')} Account Access Attempted`,
    text: `You (or someone else) entered this email address when trying to change the password of a ${config.get(
      'appProjectName'
    )} account. \
        However, this email address is not in our database of registered users and therefore the attempted password change has failed.\
        If you are a registered ${config.get(
          'appProjectName'
        )} user and your were expecting this email, please try again using the email address you gave when you signed up.\
        If you are not a registered user, please ignore this email.\
        Kind Regards\
        ${config.get('appProjectName')} Support`,
    html: `<p>You (or someone else) entered this email address when trying to change the password of a ${config.get(
      'appProjectName'
    )} account on our site.\
        </p>However, this email address is not in our database of registered users and therefore the attempted password change has failed.</p>\
        <p>If you are a registered ${config.get(
          'appProjectName'
        )} user and you were expecting this email, please try again using the email address you gave when you signed up.</p>\
        <p>If you are not a registered user, please ignore this email.</p>\
        <p>Kind regards</p>\
        <p>${config.get('appProjectName')} Support</p>`
  }
  return message
}

exports.getPasswordResetMessage = (email, resetToken) => {
  let message = {
    from: config.smtpUser,
    to: email,
    subject: `Please Reset your ${config.get('appProjectName')} Password`,
    text: `We sent this message because you requested that your ${config.get(
      'appProjectName'
    )} password be reset. 
        To Get back into your ${config.get(
          'appProjectName'
        )} account you will need to create a new password.
        Please follow these instructions:
        1. Click the link below to open a new and secure browser window
        2. Enter the requested information and follow the instructions to reset your password.
        Reset your password now: 
        ${config.get('appUrlBase')}/reset-password/${resetToken}`,
    html: `<p> We sent this message because you requested that your ${config.get(
      'appProjectName'
    )} password be reset.</p> 
        <p>To Get back into your ${config.get(
          'appProjectName'
        )} account you will need to create a new password.</p>
        <p>Please follow these instructions:</p>
        <p>1. Click the link below to open a new and secure browser window</p>
        <p>2. Enter the requested information and follow the instructions to reset your password. This link will be valid for one hour.</p>
        <p>Reset your password now:</p>
        <p><a href="${config.get(
          'appUrlBase'
        )}/reset-password/${resetToken}">${config.get(
      'appUrlBase'
    )}/reset-password/${resetToken}</a></p>`
  }
  return message
}

exports.getResetToken = (userId) => {
  const payload = {
    user: {
      id: userId
    }
  }

  const token = jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 })
  return token
}

exports.sendMessage = (message) => {
  let transporter = nodemailer.createTransport({
    host: config.get('smtpUrl'),
    port: 465,
    secure: true,
    auth: {
      user: config.get('smtpUser'),
      pass: config.get('smtpPassword')
    }
  })

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error)
    } else {
      transporter.sendMail(message)
    }
  })
}
