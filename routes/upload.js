const { FILE_PATH, THUMB_PATH } = global
const { MIMETYPES } = require('../config')

const log = require('../logger')
const cleanup = require('../scripts/cleanup')

const router = require('express').Router()

module.exports = router

const Jimp = require('jimp')

let i // Used to guarantee uniqueness of files uploaded in the same ms.

const multer = require('multer')
const upload = multer({
  storage: multer.diskStorage({
    destination: FILE_PATH,
    filename: (req, file, cb) =>
      cb(null, 
         Date.now() + `${i++}` + '.' +
         file.mimetype.slice(file.mimetype.lastIndexOf('/') + 1))
  }),
  limits: {
    fileSize: 1024 * 1024,
    files: 5
  },
  fileFilter: (req, file, cb) =>
    cb(null, MIMETYPES.includes(file.mimetype))
})

router.get('/', req => req.redirect('../'))

router.post('/', upload.array('file', 5), (req, res, next) => {
  i = 0
  cleanup()

  if (!req.files[0])
    return next(new Error('No file provided.'))

  for (const file of req.files) {    
    log.debug(`file ${file.filename} uploaded.`)
        
    Jimp.read(file.path).then(img => {
      const n = file.filename.slice(0, file.filename.lastIndexOf('.'))
      const w = img.bitmap.width, h = img.bitmap.height
      const f = w < h ? w : h
      img.crop((w / 2) - (f / 2), 0, f, f).scaleToFit(100, 100)
        .write(THUMB_PATH + n + '.jpeg')
    }).catch(log.error) // User doesn't need to know/care about this.
  }

  res.status(200).render('uploaded', {
    names: req.files.map(e => e.filename)
  })  
})