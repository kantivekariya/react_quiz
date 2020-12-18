import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import randToken from "rand-token";
import appConfig from "../../config/env";

const schema = mongoose.Schema;

const userSchema = new schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile_number: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    avatar: [{}],
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    dob: { type: String, required: true },
    hobbies: [{}],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  let user = this;
  if (!user.isModified("password")) return next();
  let hashedpassword = await bcrypt.hash(user.password, 10);
  console.log("2", hashedpassword);
  user.password = hashedpassword;
  next();
});

userSchema.methods.generateJWT = function (remember) {
  return jwt.sign(
    {
      id: this._id,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      mobile_number: this.mobile_number,
      gender: this.gender,
      country: this.country,
      state: this.state,
      city: this.city,
      dob: this.dob,
      hobbies: this.hobbies,
      jti: this._id + "_" + randToken.generator({ chars: "0-9" }).generate(6)
    },
    appConfig.jwtSecret,
    {
      expiresIn: remember ? appConfig.jwtDuration : appConfig.jwtDuration
    }
  );
};

userSchema.methods.matchPasswords = async function (candidatePassword) {
  let isMatch = await bcrypt.compare(candidatePassword, this.password);
console.log("isMatch", isMatch)
  return isMatch;
};

const userModel = mongoose.model("userModel", userSchema, "user");

export { userModel };
