const { MAX_FILES } = require('../config')
const { FILE_PATH, THUMB_PATH } = global

const fs = require('fs')

// If there are >maxNum files, delete oldest files until no longer over maxNum.
// Delete all files in thumb without a corresponding file in files.
const cleanup = (maxNum = MAX_FILES) => {
  // Filter out folders and sort files by age, descending.
  const parse = names => names.filter(e => e.indexOf('.') + 1)
    .sort((a, b) =>
      (parseInt(a.slice(0, a.lastIndexOf('.') + 3), 10) -
       parseInt(b.slice(0, b.lastIndexOf('.') + 3), 10)))

  let success = [  ], error = [  ]

  const images = parse(fs.readdirSync(FILE_PATH))

  if (images.length >= maxNum)
    for (const name of images.slice(0, images.length - maxNum))
      try {
        fs.unlinkSync(FILE_PATH + name)
        success.push(name)
      } catch (e) { error.push(e) }

  const thumbs = parse(fs.readdirSync(THUMB_PATH))

  for (const name of thumbs)
    if (!fs.existsSync(FILE_PATH + name))
      try {
        fs.unlinkSync(THUMB_PATH + name)
        success.push(name)
      } catch (e) { error.push(e) }

  return [ success, error ]
}

module.exports = cleanup
