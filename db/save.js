const dbconnect = require('./connection');
let mongoose = require('mongoose');
const FoodSchema = require('./dbModule');
const FoodModel = dbconnect.model('food', FoodSchema);
var fs = require('fs');




