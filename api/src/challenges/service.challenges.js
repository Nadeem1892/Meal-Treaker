const Challenges = require("./model.challenges")
const moment = require('moment');


const chanllengesService = {}

chanllengesService.addChallenges = async ({startDate, endDate, challengeName, description, userId, dailyUpdates}) =>{
return await Challenges.create({startDate, endDate, challengeName, description, userId, dailyUpdates})
}

chanllengesService.challemgefindById = async (id) => {
    return await Challenges.findById(id);
}

chanllengesService.getChallenge = async (userId) => {
    return await Challenges.find({userId})
}
// Update challenge completion status based on endDate
chanllengesService.updateChallengeCompletionStatus  = async () => {
    try {
        const today = moment().format("DD-MM-YYYY");
  
        // Find all active challenges
        const challenges = await Challenges.find({
          isCompleted: true,
          endDate: { $lt: today }, // Find challenges where endDate is less than today
        });
  
        // Update their status to completed
        for (const challenge of challenges) {
          challenge.isCompleted = false;
          await challenge.save();
        }
  
        return challenges;
      } catch (error) {
        throw new Error("Error updating challenge statuses");
      }
}



module.exports = chanllengesService