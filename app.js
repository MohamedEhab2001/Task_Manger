const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const ConnectDB = require("./db/connect");
const not_found = require("./middleware/not_found");
const errorHandlerMiddleWare = require("./middleware/errorHandlerMiddleWare");
require("dotenv").config();
//middleware
app.use(express.json()); // to get the data in req.body
app.use(express.static("./public"));
app.use("/api/v1/tasks", tasks);
app.use(not_found);
// the err middleware shoud be the last middleware invoked as described in express documentation
app.use(errorHandlerMiddleWare);
// routes
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await ConnectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("Server started . . .");
    });
  } catch (error) {
    console.log(error);
  }
};
start();
