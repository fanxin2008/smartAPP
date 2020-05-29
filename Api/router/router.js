'use strict'
const Router = require('koa-router');
const Foods = require('../db/food')

module.exports = function(){
    var router = new Router({
        prefix:'/api'
    })
    router.get('/', async (ctx, next) => {
        ctx.body = 'hello world';
    })
    router.get('/foodListByName',Foods.getFoodByName);
    router.get('/foodListLikeName',Foods.getFoodLikeName);
    return router
}
