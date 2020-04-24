const dbconnect = require('./connection');
let mongoose = require('mongoose');
const FoodSchema = require('./dbModule');
const Food = dbconnect.model('food', FoodSchema);
var fs = require('fs');
var timer = null;


var foodList = [];
var filename = 1;
var maxfilename = 77;
var readTag = true;





function mainCon(){
    timer = setInterval(function(){
        if(readTag){
            
        }
        if(filename > 77) {
            clearInterval(timer);
        }

    },10000)
    
}

function readFile(fname){
    fs.readFile(fname,'utf8', (err, data) => {
        if (err) throw err;
        foodList = JSON.parse(data);
    });
}
function saveItem(){

}

