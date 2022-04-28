const mongoose = require("mongoose");

const ConnectDB = (url) => {
  return mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = ConnectDB;
