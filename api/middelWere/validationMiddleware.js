const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "ERR",
        msg: error.details[0].message,
        data: null,
      });
    }
    next();
  };
  
  module.exports = validate;
  