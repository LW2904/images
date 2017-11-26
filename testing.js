const { DIRS } = require('./config')

const path = require('path')

global.FILE_PATH = path.normalize(__dirname + DIRS.files)
global.THUMB_PATH = path.normalize(__dirname + DIRS.thumbs)

const cleanup = require('./scripts/cleanup')

console.time('cleanup')
console.log(cleanup(0))
console.timeEnd('cleanup')