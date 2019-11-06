const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const { normalizeErrors } = require('../helper/mongoose');
//Get all movie
router.get('', function(req, res) {
    Movie.find({}, function(err, foundMovies) {
        if (foundMovies.length === 0) {
            return res.status(422).send({errors: [{title: 'No Movies Found!', detail: `There are no movies`}]});
          }
        res.json(foundMovies);
    });
  });
  // Get movie
  router.get('/:id', function(req, res) {
    const movieId = req.params.id;
  
    Movie.findById(movieId)
          .exec(function(err, foundMovie) {
  
      if (err || !foundMovie) {
        return res.status(422).send({errors: [{title: 'Movie Error!', detail: 'Could not find movie!'}]});
      }
  
      return res.json(foundMovie);
    });
  });
  //Edit movie
  router.patch('/:id', function(req, res) { 
    const movieData = req.body;
    Movie
    .findById(req.params.id)
    .exec(function(err, foundMovie) {
        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
          foundMovie.set(movieData);
          foundMovie.save(function(err) {
            if (err) {
              return res.status(422).send({errors: normalizeErrors(err.errors)});
            }
    
            return res.status(200).send(foundMovie);
          });

    })
  })

  //Delete movie
router.delete('/:id', function(req, res) {

    Movie
    .findById(req.params.id)
    .exec(function(err, foundMovie) {
        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
        foundMovie.remove(function(err) {
            if (err) {
              return res.status(422).send({errors: normalizeErrors(err.errors)});
            }
                    return res.json({'status': 'deleted'})
                })
         })
})

// Create movie
router.post('', function(req, res) {
    const {title, director, company, imageUrl, releaseDate, startDate} = req.body;
    const movie = new Movie({title, director, company, imageUrl, releaseDate, startDate});
    Movie.create(movie, function(err, newMovie) {
        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
        return res.json(newMovie);
    })
})


  module.exports = router;