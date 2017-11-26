const { FILE_PATH, THUMB_PATH } = global

const cleanup = require('../scripts/cleanup')

const router = require('express').Router()

module.exports = router

const fs = require('fs')

router.get('/:name', (req, res) => {
  const name = req.params.name

  let success = 0, error = 0

  if (req.params.name === 'all')
    [ success, error ] = cleanup(0)
  else
    try {
      fs.unlinkSync(FILE_PATH + name + '.jpeg')
      fs.unlinkSync(THUMB_PATH + name + '.jpeg')

      success++
    } catch (e) { error++ }

  return res.render('success', {
    message: `Deleted ${success.length} file(s)` +
    `${error ? `, failed deleting ${error.length} file(s)` : ``}.`
  })
})