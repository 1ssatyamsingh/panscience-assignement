import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {User} from '../models/user.model.js'; 
import {ApiResponse} from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  const { email, password, role } = req.body;

  // validation - not empty
  if(
    [email, password].some((field) => field?.trim() === "")
  ){
    throw new ApiError(400, "All fields are required");
  } 

  // check if user already exists :username or email
  const existedUser = await User.findOne({email})

  if(existedUser){
    throw new ApiError(409, "User already exists with this username or email");
  }

  // create user object - create entry in db
  const user = await User.create({
    email,
    password,
    role
  });

  // remove password and refreshToken field from response
  const createdUser = await User.findById(user._id).select(
    "-password"
  );

  // check if user created successfully
  if(!createdUser){
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // return response
  return res.status(201).json(
    new ApiResponse(201,createdUser,"User registered successfully")
   );

});

const loginUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // find user
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // compare password
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  // generate access token
  const accessToken = user.generateAccessToken();

  // remove password from response
  const loggedInUser = await User.findById(user._id)
    .select("-password");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken
        },
        "User logged in successfully"
      )
    );
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
  .status(200)
  .json(
    new ApiResponse(200, req.user, "Current user fetched successfully")
  );
})

const getAllUsers = asyncHandler(async (req, res) => {

  const {
    page = 1,
    limit = 10
  } = req.query;

  const skip =
    (Number(page) - 1) * Number(limit);

  const users = await User.find()
    .select("-password")
    .skip(skip)
    .limit(Number(limit));

  const totalUsers = await User.countDocuments();

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        users,
        totalUsers,
        currentPage: Number(page),
        totalPages: Math.ceil(totalUsers / limit)
      },
      "Users fetched successfully"
    )
  );
});

const updateUser = asyncHandler(async (req, res) => {

  const { email, role } = req.body;

  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.email = email || user.email;
  user.role = role || user.role;

  await user.save();

  const updatedUser = await User.findById(user._id)
    .select("-password");

  return res.status(200).json(
    new ApiResponse(
      200,
      updatedUser,
      "User updated successfully"
    )
  );
});

const deleteUser = asyncHandler(async (req, res) => {

  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  await user.deleteOne();

  return res.status(200).json(
    new ApiResponse(
      200,
      {},
      "User deleted successfully"
    )
  );
});

export { registerUser, loginUser ,getCurrentUser,getAllUsers , updateUser, deleteUser};