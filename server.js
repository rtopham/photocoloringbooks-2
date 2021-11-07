const express = require('express')
const connectDB = require('./config/db')
const path = require('path')
const fileupload = require('express-fileupload')

const app = express()

// Provide parsing for file uploads
app.use(fileupload())

//Connect Database
connectDB()

//Init Middleware
app.use(express.json())

app.get('/', (req, res) => res.send('API Running'))

//Define Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/logs', require('./routes/api/logs'))
app.use('/api/stats', require('./routes/api/stats'))
app.use('/api/all-time-stats', require('./routes/api/all-time-stats'))
app.use('/api/other-stats', require('./routes/api/other-stats'))
app.use('/api/pages', require('./routes/api/pages'))
app.use('/api/books', require('./routes/api/books'))
app.use('/api/stripe', require('./routes/api/stripe'))

// Serve Static Files

//app.use(express.static(path.join(__dirname, 'uploads')))

const PORT = process.env.PORT || 5001

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
