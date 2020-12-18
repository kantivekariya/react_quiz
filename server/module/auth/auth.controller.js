import blacklist from "express-jwt-blacklist";
import { userModel } from "./auth.model";
import httpStatus from "../../utils/httpStatus";

const userController = {};

// Create User
userController.register = async (req, res) => {
  let newUser = await userModel.create({
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    email: req.body.email,
    mobile_number: req.body.mobileno,
    password: req.body.password,
    gender: req.body.gender,
    avatar: req.body.upload,
    country: req.body.country,
    state: req.body.state,
    city: req.body.city,
    dob: req.body.dob,
    hobbies: req.body.hobbies,
    date: { type: Date, default: Date.now }
  });
  let { password, __v, ...user } = newUser.toObject();
  return res.status(httpStatus.CREATED).json({ data: { user } });
};

// Login user
userController.login = async (req, res) => {
  try {
    const mobileno = req.body.mobileno;
    const user = await userModel.findOne({ mobile_number: mobileno });
    if (!user) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        errors: [
          {
            location: "body",
            param: "mobileno",
            value: mobileno,
            msg: "User not found"
          }
        ]
      });
    }

    let isMatch = await user.matchPasswords(req.body.password);
    console.log("isMatch", isMatch);
    if (!isMatch) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        errors: [
          {
            location: "body",
            param: "password",
            value: "",
            msg: "Incorrect Password"
          }
        ]
      });
    }
    return res.json({
      token: user.generateJWT(false)
    });
  } catch (error) {
    throw error;
  }
};

userController.findOne = async (req, res) => {
  try {
    const email = req.params.email
    const user = await userModel.aggregate({ email: email }, { thumbUrl });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({})
    } else {
      return res.status(httpStatus.OK).json(user)
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ "error": error })
  }
}

userController.me = async (req, res) => {
  console.log('req.user', req.user);
  return res.json({
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    email: req.user.email,
    mobile_number: req.user.mobile_number,
    gender: req.user.gender,
    country: req.user.country,
    state: req.user.state,
    dob: req.user.dob,
    hobbies: req.user.hobbies
  });
};

userController.logout = async (req, res) => {
  blacklist.purge(req.user);
  return res.json({
    toekn: req.headers.authorization
  });
};

export default userController;
