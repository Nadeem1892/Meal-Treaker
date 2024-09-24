const router = require("express").Router()
const middleWere = require("../../middelWere/middleWere")
const validate = require("../../middelWere/validationMiddleware")
const {categoryValidationSchema} = require("../validators/categoryValidation")
const categoryController = require('./controller.categorys')
 router.post("/add-category",validate(categoryValidationSchema), categoryController.addCategory)
 router.get("/get-category", categoryController.getCategory)
 router.delete("/delete-category/:id", categoryController.deleteCategory)
 router.patch("/update-category/:id",validate(categoryValidationSchema), categoryController.updateCategory)

 module.exports = router