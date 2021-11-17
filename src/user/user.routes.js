const { Router } = require("express");
const {
  addUser,
  logIn,
  deleteUser,
  updateEmail,
} = require("./user.controllers");
const { hashPassword, comparePasswords } = require("../middleware");
const userRouter = Router();

userRouter.post("./user", hashPassword, addUser);

userRouter.post("./login", comparePasswords, logIn);

userRouter.get("/token", tokenAuth, logIn);

userRouter.put("/user", updateEmail);

userRouter.delete("/user/:username", deleteUser);

module.exports = userRouter;
