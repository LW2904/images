const { MAX_FILES } = require('../config')
const { FILE_PATH, THUMB_PATH } = global

const fs = require('fs')

const cleanup = (maxNum = MAX_FILES) => {
  // Filter out folders and sort files by age, descending.
  const parse = names => names.filter(e => e.indexOf('.') + 1)
    .sort((a, b) =>
      (parseInt(a.slice(0, a.lastIndexOf('.') + 3), 10) -
       parseInt(b.slice(0, b.lastIndexOf('.') + 3), 10)))

  const images = parse(fs.readdirSync(FILE_PATH))
  const thumbs = parse(fs.readdirSync(THUMB_PATH))
  
  const names = [ ...new Set(images.concat(thumbs)) ]

  let success = [  ], error = [  ]
  
  if (names.length >= maxNum)
    for (const name of names.slice(0, names.length - maxNum)) {
      try {
        fs.unlinkSync(FILE_PATH + name)
        fs.unlinkSync(THUMB_PATH + name)

        success.push(name)
      } catch (err) { error.push({ name, err }) }
    }

  return [ success, error ]
}

module.exports = cleanup
