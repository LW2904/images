const { FILE_PATH } = global

const cleanup = require('../scripts/cleanup')

const router = require('express').Router()

module.exports = router

const fs = require('fs')
const glob = require('glob')

router.get('/:name', (req, res) => {
  const name = req.params.name

  let success = [  ], error = [  ]

  if (req.params.name === 'all')  {
    [ success, error ] = cleanup(0)
  } else {
    const files = glob.sync(FILE_PATH + name)
    
    if (files) for (const file of files) {
      try {
        fs.unlinkSync(file)
        success.push(file)
      } catch (e) { error.push(e) }
    }
  }

  if (error) require('../logger').error(error)

  return res.render('status', {
    status: 'status',
    head: `Deleted ${success.length} file(s)` +
     `${error.length > 0 ? `, ran into ${error.length} error(s)` : ``}.`
  })
})