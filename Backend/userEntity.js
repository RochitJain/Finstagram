const mongoose = require("./database");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const schema = new mongoose.Schema(
  {
    email: { type: String },
    password: { type: String },
    name: { type: String },
    tokens: [{ token: { type: String } }],
  },
  { timestamps: true }
);

schema.methods.toJSON = async function () {
  const user = this;
  const obj = user.toObject();
  delete obj.password;
  delete obj.token;
};

schema.methods.generateToken = async function () {
  try {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString }, "ekAnek");
    if (!token) {
      throw new Error("token not generated");
    }
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
  } catch (e) {
    return null;
  }
};

schema.statics.checkCredential = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email wrong");
    }
    const isMatch = await bycrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Password wrong");
    }
    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
};

schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bycrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model("user", schema);
module.exports = User;
