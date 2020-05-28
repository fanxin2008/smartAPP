'use strict'
const Router = require('koa-router')

module.exports = function(){
    var router = new Router({
        prefix:'/api'
    })
    router.get('/', async (ctx, next) => {
        ctx.body = 'hello world';
    })
    return router
}
