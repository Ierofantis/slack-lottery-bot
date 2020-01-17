const logger = require("../../helpers/logger");
const Config = require("../../../config");
const User = require("../../../models/user");
const Lottery = require("../../../models/lottery");
const { IncomingWebhook } = require("@slack/webhook");
const url = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(url);

exports.end = async (request, response) => {
  console.log("eeedd");
  let winners;

  const lottery = await Lottery.where({ active: true }).findOne();

  console.log(lottery);

  if (lottery) {
    startRandomSelection(lottery);

    winners = lottery.winners;

    if (winners.length === 0) {
      winners = ["Leo", "Nik", "Teo", "Dimitris"];
    }
    console.log(winners);
    webhook.send("Winners Are:" + winners.join(","), (err, res) => {
      if (err) {
        console.log("Error:", err);
        response.customSuccess("ok");
      } else {
        // console.log('Message sent: ', res);
        response.customSuccess("ok");
      }
    });
  } else {
    return response.customError("No active lottery");
  }

  webhook.send("Event winners are: !", (err, res) => {
    if (err) {
      console.log("Error:", err);
      response.customSuccess("ok");
    } else {
      response.customSuccess();
    }
  });
};

exports.create = async (request, response) => {
  const oldLottery = await Lottery.where({ active: true }).findOne();
  if (oldLottery) {
    return response.customError("There is already an active lottery");
  } else {
    const data = request.body;
    data.active = true;
    data.participants = [];
    data.winners = [];
    const newLottery = new Lottery(data);
    await newLottery.save();

    return response.customSuccess();
  }
};

exports.cancel = async (request, response) => {
  const oldLottery = await Lottery.where({ active: true }).findOne();
  if (oldLottery) {
    oldLottery.active = false;
    await oldLottery.save();
    return response.customSuccess("Lottery Cancelled");
  } else {
    return response.customError("No active lottery found");
  }
};

async function startRandomSelection(lottery) {
  let participantsIds = lottery.participants
    .filter((el) => el !== null)
    .filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    });

  console.log("participantsIds ", participantsIds);

  let participants = await User.find({
    slack_id: { $in: participantsIds }
  });

  console.log(participants);

  return participants;
}
