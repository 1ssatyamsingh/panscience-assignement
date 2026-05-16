import {Task} from "../models/task.model.js"
import { User } from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

//create task
const createTask = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    status,
    priority,
    dueDate,
    assignedTo
  } = req.body;

  //validation
  if(!title){
    throw new ApiError(400, "Title is required");
  }

  // check assigned user exists
  if (assignedTo) {

    const userExists = await User.findById(assignedTo);

    if (!userExists) {
      throw new ApiError(404, "Assigned user not found");
    }
  }

  // uploaded files
  const documents = [];

  if (req.files && req.files.length > 0) {

    req.files.forEach((file) => {
      documents.push({
        fileName: file.filename,
        filePath: file.path
      });
    });
  }

  // create task
  const task = await Task.create({
    title,
    description,
    status,
    priority,
    dueDate,
    assignedTo,
    createdBy: req.user._id,
    documents
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        task,
        "Task created successfully"
      )
    );
});

//get all tasks
const getTasks = asyncHandler(async (req, res) => {

  const {
    status,
    priority,
    sortBy = "createdAt",
    order = "desc",
    page = 1,
    limit = 10
  } = req.query;


  const filter = {};

  // users can only see their tasks
  if (req.user.role !== "admin") {

    filter.createdBy = req.user._id;
  }

  // filtering
  if (status) {
    filter.status = status;
  }

  if (priority) {
    filter.priority = priority;
  }

  // sorting
  const sortOptions = {};

  sortOptions[sortBy] = order === "asc" ? 1 : -1;

  // pagination
  const skip = (Number(page) - 1) * Number(limit);

  const tasks = await Task.find(filter)
    .populate("assignedTo", "email role")
    .populate("createdBy", "email role")
    .sort(sortOptions)
    .skip(skip)
    .limit(Number(limit));

  const totalTasks = await Task.countDocuments(filter);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        tasks,
        totalTasks,
        currentPage: Number(page),
        totalPages: Math.ceil(totalTasks / limit)
      },
      "Tasks fetched successfully"
    )
  );
});

//get single task
const getTaskById = asyncHandler(async (req,res) =>{
   const task = await Task.findById(req.params.id)
    .populate("assignedTo", "email role")
    .populate("createdBy", "email role");

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  // authorization
  if (
    req.user.role !== "admin" &&
    task.createdBy._id.toString() !== req.user._id.toString()
  ) {
    throw new ApiError(403, "Access denied");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      task,
      "Task fetched successfully"
    )
  );
});

// update Taks
const updateTask = asyncHandler(async (req, res) => {

  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  // authorization
  if (
    req.user.role !== "admin" &&
    task.createdBy.toString() !== req.user._id.toString()
  ) {
    throw new ApiError(403, "Access denied");
  }

  // uploaded docs
  let documents = task.documents;

  if (req.files && req.files.length > 0) {

    documents = req.files.map((file) => ({
      fileName: file.filename,
      filePath: file.path
    }));
  }

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      documents
    },
    {
      new: true,
      runValidators: true
    }
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      updatedTask,
      "Task updated successfully"
    )
  );
});

//DELETE TASK
const deleteTask = asyncHandler(async (req, res) => {

  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  // authorization
  if (
    req.user.role !== "admin" &&
    task.createdBy.toString() !== req.user._id.toString()
  ) {
    throw new ApiError(403, "Access denied");
  }

  await task.deleteOne();

  return res.status(200).json(
    new ApiResponse(
      200,
      {},
      "Task deleted successfully"
    )
  );
});

export {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
};