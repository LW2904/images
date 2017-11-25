const router = require('express').Router()

module.exports = router

const fs = require('fs')

router.get('/', (req, res) => {
  res.render('index', {
    images: fs.readdirSync('./files').filter(e => e.indexOf('.') + 1)
  })
})
