const categoryService = require("./service.category");
const categoryController = {};


//Add
categoryController.addCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const category = await categoryService.add({ categoryName });
    return res.send({
      status: "OK",
      message: "Created category Successfulluy",
      data: category,
    });
  } catch (error) {
    console.log(error);
    return res.send({ status: "Error", message: "Error adding meal", error });
  }
};


//Get
categoryController.getCategory = async (req, res) => {
  try {
    const getAllCategory = await categoryService.get();
    return res.send({
      status: "OK",
      message: "Get all Category",
      data: getAllCategory,
    });
  } catch (error) {
    return res.send({ status: "Error", message: error, data: null });
  }
};


//Delete

categoryController.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const existingUser = await categoryService.getUserById(id);

    if (!existingUser) {
            return res.send({
              msg: "Category not existing",
              data: null,
            });
          }

    const dalete = await categoryService.deleteCategory(id)
  
    return res.send({
              status: "OK",
              msg: "Category deleted successfully",
              data: dalete,
            });
  } catch (error) {
    console.log(err);
    return res.send({
      status: "ERR",
      msg: "Something went wrong",
      data: null,
    });
  }
}



module.exports = categoryController;
