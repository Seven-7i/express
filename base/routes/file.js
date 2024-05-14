const router = require("express").Router();
const multer = require("multer");
const path = require("path")
const fs = require("fs")
const { promisify } = require("util")

// const upload = multer({ dest: "uploads/" })
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname)
    }
  })
})

// 清空上传目录
const readdir = promisify(fs.readdir)
const unlink = promisify(fs.unlink)

const emptyDirectory = async (req, res, next) => {
  try {
    const directory = path.join(__dirname, "../uploads")
    const files = await readdir(directory)
    for (const file of files) {
      await unlink(path.join(directory, file))
    }
    next()
  } catch (error) {
    next(error)
  }
}

// console.log(formidable)
router.post("/upload", emptyDirectory, upload.single('file'), (req, res) => {
  console.log('***************')
  // console.log(form)
  // res.send("upload success");
  res.json({
    files: req.file,
    data: req.body
  })
});

module.exports = router;
