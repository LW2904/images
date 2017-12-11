const { DIRS } = require('./config')

const path = require('path')

global.FILE_PATH = path.normalize(__dirname + DIRS.files)
global.THUMB_PATH = path.normalize(__dirname + DIRS.thumbs)

const rls = require('readline-sync')

rls.promptCLLoop({
  version: (x, y, z) =>
    console.log(`${require('./package.json').version}. Local NodeJS: ${process.version}.`),
  cleanup: max => {
    let result = require('./scripts/cleanup')(max)
    console.log(`Deleted ${result[0].length} file(s) successfully, encountered ${result[0].length} error(s).`)
  }
})