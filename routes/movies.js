var express = require('express');
var router = express.Router();
var db = require('../db/connection')


/* GET movies home page. */

router.get('/', function(req, res, next) {
  db('movies')
  .select('id', 'title', 'director', 'year', 'my_rating')
  .then(movies => {
    res.render('movies/index', {movies})
  })
});

router.get('/add', function (req, res, next) {
  res.render('movies/add')
})

router.get('/:id', function(req, res, next) {
  db('movies')
  .where('id', req.params.id)
  .then(movie => {
    console.log(movie);
    res.render('movies/movie', movie[0])
  })
});

router.post('/', function (req, res, next) {
  let new_movie = {'title' : req.body.title, 'director' : req.body.director, 'year' : req.body.year, 'my_rating' : req.body.my_rating, 'url' : req.body.poster_url}
  db('movies')
  .insert(new_movie)
  .then(movie => {
    res.render('/movies')
  })
})



module.exports = router;
