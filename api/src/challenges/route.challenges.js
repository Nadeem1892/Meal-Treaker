const challengesController = require("./controller.challenges")
const router = require("express").Router()
const middleWere = require("../../middelWere/middleWere")
const validate = require("../../middelWere/validationMiddleware")
const {challengesValidationSchema} = require("../validators/challengesValidation")

//add meal
router.post("/add",middleWere, validate(challengesValidationSchema), challengesController.addChallenges)
//update daily challenges
router.post("/updateDailyUpdate/:id", challengesController.addDailyUpdate)
// fatch all challenges
router.get("/getChallenges",middleWere, challengesController.getChallenges)

module.exports = router