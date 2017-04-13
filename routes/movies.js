var express = require('express')
var router = express.Router()
var db = require('../db/connection')

//Show all movies
router.get('/', function(req, res, next) {
  db('movies')
  .select('id', 'title', 'director', 'year', 'my_rating')
  .then(movies => {
    res.render('movies/index', {movies})
  })
})

//Show the add movie page
router.get('/add', function (req, res, next) {
  res.render('movies/add')
})

//GET a single movie by id
router.get('/:id', function(req, res, next) {
  let id = req.params.id
  db('movies')
  .where({id:id})
  .first()
  .then(movie => {
    res.render('movies/movie', {movie})
  })
})

//Show a movie to edit
router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id
  db('movies').select('*').where({ id }).first().then(movie => {
    res.render('movies/edit', { movie })
  })
})

//Add a new movie
router.post('/', (req, res, next) => {
  let year = parseInt(req.body.year)
  if(Number.isNaN(year) || year < 1878) {
    //invalid
    res.render('movies/new', { error: 'NO'})
  } else {
    var movie = {
      title: req.body.title,
      director: req.body.director,
      year: req.body.year,
      my_rating: req.body['my_rating'],
      poster_url: req.body['poster_url']
    }
    db('movies').insert(movie, '*').then(newMovie => {
      var id = newMovie[0].id
      res.redirect(`/movies/${id}`)
    })
  }
})

//Update a movie (edit)
router.put('/:id', (req, res, next) => {
  let id = req.params.id
  var movie = {
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    my_rating: req.body['my_rating'],
    poster_url: req.body['poster_url']
  }
  db('movies').update(movie, '*').where({id}).then(updateNewMovie => {
    var id = updateNewMovie[0].id
    res.redirect(`/movies/${id}`)
  })
})

//Delete a movie
router.delete('/:id', (req, res, next) => {
  var id = req.params.id
  db('movies').del().where({ id }).then(() => {
    res.redirect(`/movies`)
  })
})

module.exports = router
