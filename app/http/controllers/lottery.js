
const logger = require('../../helpers/logger');
const Config = require('../../../config');

exports.end = (request, response) => {
  // client.flushdb((err, succeeded) => {
  //   console.log(succeeded); // will be true if successfull
  // });
  const winners = ['me', 'you'];
  response.customSuccess(winners);
};
