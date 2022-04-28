// middleware function to wrap the asyncronous controllers
const { CreateErrorInstance } = require("../errors/customAPIError");

const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      //next(error);
      next(CreateErrorInstance("Unexpected error", 500));
    }
  };
};

module.exports = asyncWrapper;
