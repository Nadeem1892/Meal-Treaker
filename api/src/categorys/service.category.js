const Category = require("./model.category")

const serviceCategory = {}

serviceCategory.add = async ({categoryName}) => {
return await  Category.create({categoryName})
}




module.exports = serviceCategory