var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant');

router.get('restaurant/:city', function (req, res, next) {
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
        },
        categories: data.categories
    });

    // for(var i=0, len=data.categories.length;  i < len; i++){
    //     tempCategory = data.categories[i].category;
    //     tempMenus = data.categories[i].menus;
    //     restaurant.categories.push(
    //         {
    //             category: tempCategory,
    //             menus:    tempMenus
    //         }
    //     );
    // }
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

router.get('/categories',function(req,res,next){
    console.log(req.query.categ);
    Restaurant.find({categories: {$elemMatch: { category: req.query.categ}}},function(err,result){
        res.status(200).json({
            message: 'Successful',
            obj: result
        });
    });
    
    // res.status(200).json({
    //     message: 'Successful',
    //     obj: req.query.category
    // });
});

module.exports = router;