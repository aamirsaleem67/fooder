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
        name: "Pizza hut",
        location: "Gulshan",
        city: "Karachi",
        rating: "4",
        timings: { 
            days: "Monday to sat",
            opening: "9",
            closing: "11",
            closed: "sunday"
        }
    });
    for(var i=0, len=data.categories.length;  i < len; i++){
        tempCategory = data.categories[i].category;
        myMenus = data.categories[i].menus;
        restaurant.push(
            {
                category: tempCategory,
                menus: myMenus
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

module.exports = router;