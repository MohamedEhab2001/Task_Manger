const { customAPIError } = require("../errors/customAPIError");
const errorHandlerMiddleWare = (err, req, res, next) => {
  /*if (err instanceof customAPIError) {
    return res.status(err.statusCode).send(err.message);
  }
  return res.status(500).json({ err });*/
  return res.status(err.statusCode).send(err.message);
};
module.exports = errorHandlerMiddleWare;
