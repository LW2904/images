const { FILE_PATH, THUMB_PATH } = global

const cleanup = require('../scripts/cleanup')

const router = require('express').Router()

module.exports = router

const fs = require('fs')

router.get('/:name', (req, res) => {
  const name = req.params.name

  if (req.params.name === 'all')
    cleanup(0)

  if (fs.existsSync(FILE_PATH + name))
    fs.unlinkSync(FILE_PATH + name)

  if (fs.existsSync(THUMB_PATH + name))
    fs.unlinkSync(THUMB_PATH + name)

  return res.render('success', { message: 'Deleted file(s).' })
})