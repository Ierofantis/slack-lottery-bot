const logger = require("../../helpers/logger");
const Config = require("../../../config");
const User = require("../../../models/user");
const Lottery = require("../../../models/lottery");
const { IncomingWebhook } = require("@slack/webhook");
const url = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(url);

exports.end = async (request, response) => {
  let winners = [];
  const lottery = await Lottery.where({ active: true }).findOne();

  console.log(lottery);

  if (lottery) {
    winners = await startRandomSelection(lottery);

    if (winners.length === 0) {
      winners = ["Leo", "Nik", "Teo", "Dimitris"];
    }

    console.log("@@@ ", winners);

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
  const maxWinners = lottery.max_winners || 10;
  const userProbabilityBucket = [];
  const winnersList = [];
  let probabilitySum = 0;

  let participantsIds = lottery.participants
    .filter((el) => el !== null)
    .filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    });

  let participants = await User.find({
    slack_id: { $in: participantsIds }
  });

  for (const participant of participants) {
    console.log("here ", participant);
    console.log("here ", participant.probability);

    if ([null, undefined].includes(participant.probability)) {
      participant.probability = 100;
      participant.save();
    }

    let tempProbability = participant.probability;
    probabilitySum += tempProbability;
    userProbabilityBucket.push({
      participant: participant,
      bucket: probabilitySum
    });
  }

  while (winnersList.length < maxWinners) {
    let rand = randomInteger(1, probabilitySum);
    console.log("probabilitySum ", probabilitySum);
    console.log("rand ", rand);

    let winner = findBucketWinner(rand, userProbabilityBucket, winnersList);
    console.log("winner ", winner);

    if (winner) {
      winnersList.push(winner.slack_id);
    }
  }

  let newParticipants = await User.find({
    slack_id: { $in: participantsIds }
  });

  for (const participant of newParticipants) {
    if (
      !winnersList.includes(participant.slack_id) &&
      participant.probability !== 100
    ) {
      participant.probability = Math.min(100, participant.probability + 10);
    } else {
      participant.probability = 1;
    }
    participant.save();
  }

  console.log("!! ", winnersList);

  return winnersList;
}

function findBucketWinner(rand, userProbabilityBucket, winnersList) {
  for (const userProbability of userProbabilityBucket) {
    if (
      rand <= userProbability.bucket &&
      !winnersList.includes(userProbability.participant.slack_id)
    ) {
      return userProbability.participant;
    }
  }
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
