const router = require("express").Router();
const formidable = require("formidable");
console.log(formidable)
router.post("/upload", (req, res, next) => {
  const form = formidable({})
  console.log(form)
  form.parse(req, (err, fields, files) => {
    if (err) {
      return next(err)
    }
  })
  console.log(files, fields)
  res.json({files, fields});
});

module.exports = router;
