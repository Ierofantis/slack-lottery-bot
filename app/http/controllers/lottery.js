
const logger = require('../../helpers/logger');
const Config = require('../../../config');
// const { User } = require('../../../models/user');
const Lottery = require('../../../models/lottery');

exports.end = (request, response) => {
  const winners = ['me', 'you'];

  webhook.send('Event winners are: !', (err, res) => {
    if (err) {
      console.log('Error:', err);
      response.customSuccess('ok');
    } else {
      response.customSuccess();
    }
  });

};


exports.create = async (request, response) => {

  const oldLottery = await Lottery
      .where({ active: true })
      .findOne();
  if (oldLottery) { 
    return response.customError('There is already an active poll');
  } else {
    const data = request.body;
    data.active = true;
    data.participants = [];
    data.winners = [];
    const newLottery = new Lottery(data);
    await newLottery.save();

    return response.customSuccess();
  }

}


exports.cancel = async (request, response) => {

  const oldLottery = await Lottery
      .where({ active: true })
      .findOne();
  if (oldLottery) { 
    oldLottery.active = false;
    await oldLottery.save();
    return response.customSuccess('Lottery Cancelled');
  } else {
    return response.customError('No active lottery found');
  }

}