const Plan = require("./model.mealPlan")


const planService = {}
//add plans
planService.addPlan = async ({ startDate, endDate, planName, description, userId }) => {
return await Plan.create({ startDate, endDate, planName, description, userId })
}


planService.getPlans = async (userId) => {
    return await Plan.find({userId})
} 

module.exports = planService