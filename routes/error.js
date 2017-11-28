const handle = (err, req, res, next) => {
  require('../logger').debug(err.message)

  res.status(500).render('status', {
    status: 'error',
    head: err.message.length < 100 ? err.message : '',
    message: err.message.length > 100 ? err.message : ''
    // (err.message.length < 100 ? 'head' : 'message'): err.message // :(
  })

  next()
}

module.exports = handle
