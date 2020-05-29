const dbconnect = require('./connection');
var Foodmodel = require('./dbModule').getModel('food');
// var Foods = dbconnect.model(Foodmodel);
var getFoodByName = async ({name}) => {
    console.log(name);
    var res = await Foodmodel.find({'name':name}).exec();
    console.log(res)
    return res;
}
var getFoodLikeName = async ({name}) => {
    console.log(name);
    var regname = new RegExp(name, 'i');
    var res = await Foodmodel.find({name:{$regex : regname}}).exec();
    console.log(res)
    return res;
}
exports.getFoodByName = async(ctx, next) => {
    var body = ctx.request.body || {}
    var name = ctx.query.name;
    console.log(body,name)
    var foodslist = await getFoodByName({name:name});
    ctx.body = {
        success: true,
        data:foodslist
    }
    await next;
}
exports.getFoodLikeName = async(ctx, next) => {
    var body = ctx.request.body || {}
    var name = ctx.query.name;
    console.log(body,name)
    var foodslist = await getFoodLikeName({name:name});
    ctx.body = {
        success: true,
        data:foodslist
    }
    await next;
}