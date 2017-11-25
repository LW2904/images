const { MIMETYPES } = require('../config')

const log = require('../logger')

const router = require('express').Router()

module.exports = router

const Jimp = require('jimp')

const multer = require('multer')
const upload = multer({
  storage: multer.diskStorage({
    destination: './files/',
    filename: (req, file, cb) =>
      cb(null, Date.now() + '.' +
               file.mimetype.slice(file.mimetype.lastIndexOf('/') + 1))
  }),
  limits: {
    fileSize: 1024 * 1024,
    files: 1
  },
  fileFilter: (req, file, cb) =>
    cb(null, MIMETYPES.includes(file.mimetype))
})

router.post('/', upload.single('file'), (req, res, next) => {
  const file = req.file
  
  if (!file)
    return next(new Error('Invalid file.'))
  
  log.debug(`file ${file.filename} uploaded.`)
  
  res.status(200).render('uploaded', { name: file.filename })
  
  Jimp.read(file.path).then(img => {
    const w = img.bitmap.width, h = img.bitmap.height
    const f = w < h ? w : h
    img.crop((w / 2) - (f / 2), 0, f, f).scaleToFit(100, 100)
       .write('./files/thumbs/' + file.filename)
  }).catch(log.error) // User doesn't need to know/care about this.
})