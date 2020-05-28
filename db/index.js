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
            readTag = false;
            var fn = './result/f' + filename + '.json';
            readFile(fn);
            filename++;
        }
        
        if(filename > maxfilename) {
            clearInterval(timer);
        }
    },10000)
    
}

function readFile(fname){
    fs.readFile(fname,'utf8', (err, data) => {
        if (err) throw err;
        foodList = JSON.parse(data);
        saveRecord(foodList);
    });
}

function saveRecord(foodList){
    if(foodList.length < 1) return;
    Food.create(foodList,function(err,data){
        if (err) {
            console.log(err);
            console.log('current file index',filename);
            clearInterval(timer);
        } else {
            readTag = true; 
            console.log('save success ' ,filename-1);
        }
    });

}
mainCon();


