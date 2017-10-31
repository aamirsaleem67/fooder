var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var timeSchema = new mongoose.Schema({
    days: { type: String, required: true },
    opening: String,
    closing: String,
    closed: { type: Boolean, required: true }
});

var reviewSchema = new mongoose.Schema({
    author: String,
    rating: { type: Number, required: true, min: 0, max: 5 },
    reviewText: String,
    createdOn: { type: Date, "default": Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

var catergoriesSchema = new mongoose.Schema({
        category: {type: String, required: true},
        menus: [{
            food: {type: String, required: true},
            description: String,
            price: {type: String, required: true}
        }]    
});

var locationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    city: { type: String, required: true },
    rating: { type: Number, "default": 0, min: 0, max: 5 },
    timings: { timeSchema },
    categories: [catergoriesSchema],
    reviews: [reviewSchema]
});

module.exports = mongoose.model('Restaurant', locationSchema);