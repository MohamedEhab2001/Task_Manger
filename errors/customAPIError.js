class customAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
const CreateErrorInstance = (msg, code) => {
  return new customAPIError(msg, code);
};

module.exports = { CreateErrorInstance, customAPIError };
