var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const models = {
	food: {
 	    name:{type:String},
	    "热量":{type:String},
 	    "硫胺素": {type:String},
 	    "钙":{type:String},
 	    "蛋白质":{type:String},
 	    "核黄素":{type:String},
 	    "镁":{type:String},
 	    "脂肪":{type:String},
 	    "烟酸":{type:String},
 	    "铁":{type:String},
 	    "碳水化合物":{type:String},
 	    "维生素C":{type:String},
 	    "锰":{type:String},
 	    "膳食纤维":{type:String},
 	    "维生素E":{type:String},
 	    "锌":{type:String},
 	    "维生素A": {type:String},
 	    "胆固醇": {type:String},
 	    "铜":{type:String},
 	    "胡罗卜素": {type:String},
 	    "钾": {type:String},
 	    "磷": {type:String},
 	    "视黄醇": {type:String},
 	    "钠": {type:String},
 	    "硒": {type:String}
 	},
    record: {
        meta: {
            createAt:{
                type:Date,
                default: Date.now()
            },
            updateAt:{ 
                type: Date,
                default: Date.now()
            } 
        }, 
        type: {
            type:String}
        },
        name: {type:String},
        weight:{type:Number},
        id:{type:String,unique:true},
        userid:{type:String}
    }
for(var m in models){
    mongoose.model(m, new Schema(models[m]);
}
module.exports = {
    getModel: function(type){
        return mongoose.model(type);
    }
}        

