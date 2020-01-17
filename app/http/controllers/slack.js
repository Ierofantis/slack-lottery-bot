const { IncomingWebhook } = require('@slack/webhook')
const logger = require('../../helpers/logger')
const Config = require('../../../config')

const url = process.env.SLACK_WEBHOOK_URL
const webhook = new IncomingWebhook(url)
const lotteryKey = process.env.LOTTERY_KEY
const { User } = require('../../../models/user')
const { Lottery } = require('../../../models/lottery')

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
  const oldLottery = await Lottery.where({ active: true }).findOne()

  if (!oldLottery) {
    const userExistsInDB = await User.where({
      slack_id: request.body.event.user
    }).findOne()

    if (!userExistsInDB) {
      const newUser = new User({
        slack_id: request.body.event.user
      })

      await newUser.save()
    }

    const newLottery = new User({
      participant: request.body.event.user
    })

    await newLottery.save()
  } else {
    return response.customSuccess('is running')
  }
}
