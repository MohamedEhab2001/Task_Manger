const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { CreateErrorInstance } = require("../errors/customAPIError");
// get All tasks
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});
// insert new task
const createTask = asyncWrapper(async (req, res) => {
  const { name, completed } = req.body;
  const task = await Task.create({
    name: name,
    complete: completed,
  });
  res.status(201).json({ task });
});

// get a single task
const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const specificTask = await Task.findOne({ _id: taskID });
  if (!specificTask) {
    return next(CreateErrorInstance(`There is no task with this id`, 404));
  }
  res.status(200).json({ specificTask });
});

// update the task
const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const specificTask = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!specificTask) {
    return next(CreateErrorInstance(`There is no task with this id`, 404));
  }
  res.status(200).json({ specificTask, msg: `updated` });
});

// delete the task
const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const specificTask = await Task.findOneAndDelete({ _id: taskID });
  if (!specificTask) {
    return next(CreateErrorInstance(`There is no task with this id`, 404));
  }
  res.status(200).json({ specificTask, msg: `Deleted` });
});
module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
