'use strict'
const mongoose = require('mongoose')
const db = 'mongodb://127.0.0.1:27017/smart'

mongoose.Promise = require('bluebird')

mongoose.connect(db)
require('babel-register')
const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const app = new Koa()
app.keys = ['fx']
app.use(logger())
app.use(session(app))
app.use(bodyParser())
const router = require('./router/router')()
app.use(router.routes()).use(router.allowedMethods());
var param = process.argv[2];
console.log(param)
app.listen(param)
console.log('app start at port' + param);
