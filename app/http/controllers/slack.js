const { IncomingWebhook } = require('@slack/webhook')
const logger = require('../../helpers/logger')
const Config = require('../../../config')

const url = process.env.SLACK_WEBHOOK_URL
const webhook = new IncomingWebhook(url)
const User  = require('../../../models/user')
const Lottery  = require('../../../models/lottery')

exports.connect = (request, response) => {
  webhook.send('Event started please register!', (err, res) => {
    if (err) {
      console.log('Error:', err)
      response.customSuccess('ok')
    } else {
      // console.log('Message sent: ', res);
      response.customSuccess(res)
    }
  })
}

exports.buyin = async (request, response) => {

  if(process.env.VERIFY_SLACK){
    return response.send(request.body.challenge);
  }

  const lottery = await Lottery.where({ active: true }).findOne();
  let slackMsg;
  const userName = request.body.event.text.replace('<@UDW82H33R> ', '');

  if (lottery) {
    const userExistsInDB = await User.where({
      slack_id: request.body.event.user
    }).findOne();

    if (!userExistsInDB) {
      const newUser = new User({
        slack_id: request.body.event.user,
        probability: 100
      });
      await newUser.save();
    } else {
      userExistsInDB.reg_alias = userName;
      console.log(userName)
      await userExistsInDB.save();
    }

    lottery.participants.push(request.body.event.user)
    await lottery.save();
    slackMsg = `Thanks ${userName} Good Luck!`;

  } else {
    slackMsg = `Sorry ${userName} Νο massage today!`;
  }

  webhook.send(slackMsg, (err, res) => {
    if (err) {
      logger.error(err);
    } else {
      response.customSuccess('ok');
    }
  });
};
