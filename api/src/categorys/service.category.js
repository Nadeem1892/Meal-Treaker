const Category = require("./model.category")

const serviceCategory = {}

serviceCategory.add = async ({categoryName}) => {
return await  Category.create({categoryName})
}

serviceCategory.get = async () => {
    return await Category.find({})
}




module.exports = serviceCategory