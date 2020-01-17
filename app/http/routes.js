const express = require('express');
const middleware = require('./middleware');
const SlackController = require('./controllers/slack');
const LotteryController = require('./controllers/lottery');


// API ROUTES
const api = express.Router();
api.use(middleware.cors);
api.use(middleware.json);
api.use(middleware.urlencoded);
api.use(middleware.log);
api.use(middleware.authExternal);
api.use(middleware.response);


api.get('/', (creq, res) => res.customSuccess());
api.get('/slack/connect', SlackController.connect);
api.post('/slack/buyin', SlackController.buyin);
api.post('/lottery/end', LotteryController.end);
api.post('/lottery/create', LotteryController.create);
api.post('/lottery/cancel', LotteryController.cancel);
// api.get('/subjects/:brand/:email', SlackController.retrieve);
// api.get('/subjects/:id/verify', SlackController.verify);
// api.get('/subjects/purge', SlackController.purge);

exports.api = api;
