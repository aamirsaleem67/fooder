var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant');

router.get('/:city', function (req, res, next) {
    Restaurant.find({ city: req.params.city }, function(err, result){
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            obj: result
        });
     });
});

 
router.post('/restaurant', function(req,res,next){
    var data= req.body;
    var restaurant = new Restaurant({
        name: data.name,
        location: data.location,
        city: data.city,
        rating: data.rating,
        timings: { 
            days: data.days,
            opening: data.opening,
            closing: data.closing,
            closed: data.closed
        }
    });

    for(var i=0, len=data.categories.length;  i < len; i++){
        tempCategory = data.categories[i].category;
        tempMenus = data.categories[i].menus;
        restaurant.categories.push(
            {
                category: tempCategory,
                menus:    tempMenus
            }
        );
    }
    restaurant.save(function(err,result){
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Restaurant created',
            obj: result
        });
    });
});

router.post('/addReview', function(req,res,next){
    console.log('query', req.body.restaurantId);
    Restaurant.findById(req.body.restaurantId)
        .select('reviews')
        .exec(
            function(err,restaurant){
                if(!restaurant){
                    return res.status(500).json({
                        title: 'No such restaurant exist',
                        error: err
                    });
                }
                var decoded = jwt.decode(req.body.token);
                restaurant.reviews.push({
                    author: 'Hamza',
                    rating: 2,
                    reviewText: 'Khana kam mila',
                    user: decoded.user._id
                });
                restaurant.save(function(err,result){
                    res.status(201).json({
                        obj: result
                    });
                });
               
            }
        );
    // Restaurant.find({_id: ObjectId(req.body.restaurantId), reviews:{$elemMatch: { author:'Talha'}}})
    //           .select('reviews')
    //           .exec(
    //               function(err, result){
    //                   console.log('Result',result);
    //                   res.status(201).json({
    //                       obj:'result'
    //                   });
    //               }
    //           );
});

router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});
module.exports = router;