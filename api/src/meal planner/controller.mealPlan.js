const planService = require("./service.mealPlan");

const planController = {};

planController.addPlan = async (req, res) => {
  try {
    const { startDate, endDate, planName, description } = req?.body;
    const addNewPlan = await planService.addPlan({
      startDate,
      endDate,
      planName,
      description,
      userId: req?._id,
    });

    return res
    .status(201)
    .send({ status: "OK", msg: "Plan Created Successfulluy", data: addNewPlan });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error Plan not created", error });
  }
};

planController.getPlan = async (req, res) => {
try {
    const userId = req._id;
    let allplans = await planService.getPlans(userId)
    if (!allplans.length) {
        return res.send({ message: "Data not found", meals });
       }
       res.status(200).json({ message: "Meals retrieved successfully", data:allplans});
} catch (error) {
    res.status(500).json({ message: "Error retrieving meals", error });
}
}

module.exports = planController;
