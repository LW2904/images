const cleanup = require('../scripts/cleanup')

const router = require('express').Router()

module.exports = router

const fs = require('fs')

router.get('/:name', (req, res) => {
  const name = req.params.name

  if (req.params.name === 'all')
    cleanup(0)

  if (fs.existsSync(`./files/${name}`))
    fs.unlinkSync(`./files/${name}`)
  if (fs.existsSync(`./files/thumbs/${name}`))
    fs.unlinkSync(`./files/thumbs/${name}`)

  return res.render('success', { message: 'Deleted file(s).' })
})