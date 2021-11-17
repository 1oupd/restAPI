const bcrypt = require("bcryptjs");
const User = require("../user/user.model");
const jwt = require("jsonwebtoken");

exports.hashPassword = async (req, res, next) => {
  try {
    const pass = req.body.password;
    const hashedPass = await bcrypt.hash(pass, 8);
    req.body.password = hashedPass;
    next();
  } catch (error) {
    res.status(500).send({ message: "check server logs" });
  }
};

exports.comparePasswords = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const comparisonBool = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (comparisonBool) {
      req.user = user;
      next();
    } else {
      res.status(500).send({ message: "incorrect details" });
    }
  } catch (error) {
    res.status(500).send({ message: "check server logs" });
  }
};

exports.tokenAuth = async () => {
  try {
    const token = req.header("authorization");
    const noBearerToken = token.replace("bearer ", "");
    const tokenObj = jwt.verify(noBearerToken, process.env.SECRET);
    const user = await User.findOne({ _id: tokenObj._id });
    req.user = user;
    next();
  } catch (error) {
    res.status(500).send({ message: "check server logs" });
  }
};
// get mongo uri
