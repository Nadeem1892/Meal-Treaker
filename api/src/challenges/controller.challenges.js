const chanllengesService = require("./service.challenges");
const moment = require("moment");
const challengesController = {};

challengesController.addChallenges = async (req, res) => {
  try {
    const { startDate, endDate, challengeName, description } = req?.body;

    
    const dailyUpdates = [];
    let currentDate = moment(startDate, "DD-MM-YYYY");

    while (currentDate.format("DD-MM-YYYY") <= endDate) {
        dailyUpdates.push({ date: currentDate.format("DD-MM-YYYY"), isChecked: false });
        currentDate.add(1, "days");
      }
 // Check if endDate has already passed  ........
 const today = moment().format("DD-MM-YYYY");
 let isCompleted = today > endDate ? false : true;

    const challenges = await chanllengesService.addChallenges({
      startDate,
      endDate,
      challengeName,
      description,
      userId: req?._id,
      dailyUpdates,
      isCompleted 
    });

     // Update challenge completion status
    await chanllengesService.updateChallengeCompletionStatus()
    return res.status(201).send({
      status: "OK",
      msg: "Challenges Created Successfulluy",
      data: challenges,
    });
  } catch (error) {
    return res.status(500).send({ message: "Challenges Plan not created" });
  }
};

challengesController.addDailyUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, isChecked } = req.body;

    if (typeof isChecked !== "boolean") {
      return res
        .status(400)
        .send({ message: "isChecked must be a boolean value." });
    }

    const challenge = await chanllengesService.challemgefindById(id);

    if (!challenge) {
      return res.status(400).send({ message: "Challenge not found." });
    }

    const update = challenge.dailyUpdates?.find(
      (update) => update.date === date
    );
    if (update) {
      update.isChecked = isChecked;
    } else {
        update = { date, isChecked };
        challenge.dailyUpdates.push(update);
    }
    // Save the updated challenge
    await challenge.save();

    res
      .status(200)
      .send({
        message: "Daily updated challenge successfully.",
        update,
      });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error updating daily update status", error });
  }
};

challengesController.getChallenges = async (req, res) => {
    try {
        const userId = req?._id
        const getChallenges = await chanllengesService.getChallenge(userId)
        return res.status(201).send({
            status: "OK",
            msg: "Successfulluy",
            data: getChallenges,
          });
    } catch (error) {
        
    }
}



module.exports = challengesController;
