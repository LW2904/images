const express = require('express')
const root = express()

const app = express.Router()

root.use('/files', app)

root.set('view engine', 'ejs')

root.enable('trust proxy')

app.use(require('helmet')())                // Basic security.
app.use(require('morgan')('dev', {          // Logging.
  stream: { write: msg => require('./logger').verbose(msg.trim()) }
}))

app.use(express.static('files'))            // Images.
app.use('/thumb', express.static('thumbs')) // Thumbnails.

app.use(express.static('static'))           // Pages.

app.use('/', require('./fs'))               // Filesystem; Upload/Delete.

app.use(require('./error'))                 // Handle errors.

root.listen(8083)
