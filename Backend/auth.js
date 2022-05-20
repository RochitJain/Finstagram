const jwt = require("jsonwebtoken");
const User = require("./userEntity");

const userAuth = async (req, res, next) => {
  try {
    // console.log(req);
    const token = req.header("token");
    //console.log(token);
    const decode = jwt.verify(token, "ekAnek");
    const user = User.findOne({ _id: decode._id, "tokens.token": token });
    req.user = user;
    req.token = token;
    //console.log(req);
    next();
  } catch (e) {}
};

module.exports = userAuth;
