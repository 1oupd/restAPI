const User = require("./user.model");

exports.addUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const token = await newUser.generateAuthToken();
    await newUser.save();
    res.status(200).send({ message: "success", newUser, token });
  } catch (error) {
    console.log(error);
    res
      .status(418)
      .send({ message: "something went wrong. check server logs" });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await req.user.generateAuthToken();
    res.status(200).send(req.user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "check server logs" });
  }
};

exports.updateEmail = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { username: req.body.username },
      { email: req.body.email }
    );
    console.log({ username: req.body.username }, { email: req.body.email });
    res.statys(200).send({ message: "email updated" });
  } catch (error) {
    console.log(
      exportsres
        .status(418)
        .send({ message: "something went wrong. check server logs" })
    );
  }
};

exports.deleteUser = async (req, res) => {
  try {
    console.log({ username: req.params.username });
    await User.findOneAndDelete({ username: req.params.username });
    res.status(200).send({ message: "successfully deleted from db" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "check server logs" });
  }
};
