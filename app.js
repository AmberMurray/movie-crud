var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var favicon = require('serve-favicon')
var hbs = require('hbs')
var logger = require('morgan')
var methodOverride = require('method-override')
var path = require('path')

//Route files
var index = require('./routes/index')
var movies = require('./routes/movies')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(methodOverride('_method'))
app.use(favicon(path.join(__dirname, 'public', 'water-drop-512-24961.png')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
hbs.registerPartials(path.join(__dirname, 'views', 'partials'))

app.use('/', index)
app.use('/movies', movies)
// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message //res.locals is the error object
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
