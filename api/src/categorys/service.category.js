const Category = require("./model.category")

const serviceCategory = {}

serviceCategory.add = async ({categoryName}) => {
return await  Category.create({categoryName})
}

serviceCategory.get = async () => {
    return await Category.find({})
}

//get user by id 
serviceCategory.getCategoryById = async (id) => {
    // Fetch the user by ID from the database
    return await Category.findById(id);
  },

  serviceCategory.deleteCategory = async (id) => {
    return await Category.deleteOne({ _id: id })
  }


  //update Servivce 

  serviceCategory.updateCategory = async (id,{categoryName}) => {
  return await Category.findOneAndUpdate({_id:id}, {categoryName})
  }


module.exports = serviceCategory