const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.enable('trust proxy')

// Basic security and logging.
app.use(require('helmet')())
app.use(require('morgan')('dev', {
  stream: { write: msg => require('./logger').verbose(msg.trim()) }
}))

// serve images and thumbnails.
app.use(express.static('files'))
app.use('/thumb', express.static('files/thumbs'))

// Pages.
app.use(express.static('static'))
app.use('/index', require('./routes/index'))

// API.
app.use('/upload', require('./routes/upload'))
app.use('/delete', require('./routes/delete'))

// Catch-all for errors.
app.use(require('./error'))

app.listen(8083)
