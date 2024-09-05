const challengesController = require("./controller.challenges")
const router = require("express").Router()
const middleWere = require("../../middelWere/middleWere")
const validate = require("../../middelWere/validationMiddleware")
const {challengesValidationSchema} = require("../validators/challengesValidation")


router.post("/add",middleWere, validate(challengesValidationSchema), challengesController.addChallenges)
router.post("/updateDailyUpdate/:id", challengesController.addDailyUpdate)
router.get("/getChallenges",middleWere, challengesController.getChallenges)

module.exports = router