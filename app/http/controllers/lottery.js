
const logger = require('../../helpers/logger');
const Config = require('../../../config');
// const { User } = require('../../../models/user');
// const { Lottery } = require('../../../models/lottery');

exports.end = (request, response) => {
  // client.flushdb((err, succeeded) => {
  //   console.log(succeeded); // will be true if successfull
  // });
  const winners = ['me', 'you'];
  response.customSuccess(winners);
};


exports.create = (request, response) => {

  console.log(request.body)

  const data = request.body;
  const newLottery = new Lottery(data);
  await newLottery.save();

  return response.customSuccess();

}