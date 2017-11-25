const { MAX_FILES } = require('../config')
const { FILE_PATH, THUMB_PATH } = global

const log = require('../logger')

const fs = require('fs')

const cleanup = (maxNum = MAX_FILES) => {
  const parse = names => names.filter(e => e.indexOf('.') + 1)
    .sort((a, b) =>
      (parseInt(a.slice(0, a.lastIndexOf('.') + 3), 10) -
       parseInt(b.slice(0, b.lastIndexOf('.') + 3), 10)))

  const images = parse(fs.readdirSync(FILE_PATH))
  const thumbs = parse(fs.readdirSync(THUMB_PATH))
  
  const names = [...new Set(images.concat(thumbs))]
  
  if (names.length >= maxNum)
    for (const name of names.slice(0, names.length - maxNum)) {
      fs.unlink(FILE_PATH + name, err => { if (err) log.silly(err) })
      fs.unlink(THUMB_PATH + name, err => { if (err) log.silly(err) })

      log.silly(`tried deleting file ${name}`)
    }
}

module.exports = cleanup
