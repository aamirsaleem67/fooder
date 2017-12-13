var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Restaurant = require('../models/restaurant');
var ObjectId = require('mongoose').Types.ObjectId;

router.use('/', function (req, res, next) {
    jwt.verify(req.body.token, 'secret', function (err, decoded) {
        console.log(decoded);
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});

router.use('/', function (req, res, next) {
    Restaurant.findById(req.body.restaurantId,function(err,result){
        if(!result){
            return res.status(500).json({
                title: 'Restaurant Not found',
                error: err
            });
        }
        next()
    });
});

router.use('/', function (req, res, next) {
    var decoded = jwt.decode(req.body.token);
    Restaurant.findOne({_id: ObjectId(req.body.restaurantId), reviews:{$elemMatch: { user: ObjectId(decoded.user._id)}}},function(err,result){
    if(result){
        return res.status(500).json({
            title: 'User already added a review',
            error: err
        });
    }
    next();
    
    
});
   
});

router.post('/addReview', function(req,res,next){
    console.log('query', req.body.restaurantId);
    Restaurant.findById(req.body.restaurantId)
        .select('reviews')
        .exec(
            function(err,restaurant){
                var decoded = jwt.decode(req.body.token);
                restaurant.reviews.push({
                    author: decoded.user.firstName + " " + decoded.user.lastName,
                    rating: req.body.rating,
                    reviewText: req.body.reviewText,
                    user: decoded.user._id
                });
                updateAverageRating(req.body.restaurantId);
                restaurant.save(function(err,result){
                    res.status(201).json({
                        obj: result
                    });
                });
               
            }
        );
});

var updateAverageRating = function(locationid) {
    console.log("Update rating average for", locationid);
    Restaurant
      .findById(locationid)
      .select('reviews')
      .exec(
        function(err, location) {
          if (!err) {
            doSetAverageRating(location);
          }
        });
  };
  
  var doSetAverageRating = function(location) {
    var i, reviewCount, ratingAverage, ratingTotal;
    if (location.reviews && location.reviews.length > 0) {
      reviewCount = location.reviews.length;
      ratingTotal = 0;
      for (i = 0; i < reviewCount; i++) {
        ratingTotal = ratingTotal + location.reviews[i].rating;
      }
      console.log(ratingTotal);
      ratingAverage = ratingTotal / reviewCount;
      location.rating = ratingAverage;
      location.save(function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Average rating updated to", ratingAverage);
        }
      });
    }
  };

module.exports = router;