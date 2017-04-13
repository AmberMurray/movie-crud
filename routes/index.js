var express = require('express')
var router = express.Router()

//GET (show) home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Best Movie Page EVER!' })
})

module.exports = router
