const { IncomingWebhook } = require('@slack/webhook');
const logger = require('../../helpers/logger');
const Config = require('../../../config');

const url = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(url);
const lotteryKey = process.env.LOTTERY_KEY;


exports.connect = (request, response) => {
  console.log(url)
  webhook.send('Event started please register!', (err, res) => {
    if (err) {
      console.log('Error:', err);
      response.customSuccess('ok');
    } else {
      // console.log('Message sent: ', res);
      response.customSuccess(res);
    }
  });
};

exports.buyin = (request, response) => {
  response.customSuccess({
    challenge: request.body.challenge
  });

  // const text = request.body.event.text.replace('<@UDW82H33R> ', '').split(' ');
  // const { user } = request.body.event;
  // const userName = text[0];

  // let slackMsg = false;
  // if (true) {
  //   slackMsg = `Thanks Dude ({${userName}) Good Luck!`;
  // } else {
  //   slackMsg = `Sorry Dude (${userName}) Νο massage today!`;
  // }
  
  // webhook.send(slackMsg, (err, res) => {
  //   if (err) {
  //     logger.error(err);
  //   } else {
  //     response.customSuccess(res);
  //   }
  // });
};
1