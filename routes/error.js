const handle = (err, req, res, next) => {
  res.status(500).render('status', {
    status: 'error',
    head: err.message.length < 100 ? err.message : false,
    message: err.message.length > 100 ? err.message : false
    // (err.message.length < 100 ? 'head' : 'message'): err.message // :(
  })

  next()
}

module.exports = handle
