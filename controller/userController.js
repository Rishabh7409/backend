const db = require("../models");
const User = db.users;
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
  const { name, phone, email, password } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 12);
  let obj = { name, phone, email, password: hashedPassword };
  try {
    const result = await User.findOne({ where: { email: email } });
    if (result) {
      return res
        .status(200)
        .json({ status: 1, message: "User email already exits" });
    }
    const data = await User.create(obj);
    return res.status(200).json({
      status: 1,
      message: "Created",
      data: {
        user: data,
      },
    });
  } catch (error) {
    return res.send(error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await User.findOne({ where: { email: email } });
    if (!result) {
      return res
        .status(200)
        .json({ status: 0, data: null, message: "User not exits" });
    }
    const validPassword = await bcryptjs.compare(password, result.password);
    if (!validPassword) {
      return res
        .status(200)
        .json({ status: 0, message: "Password is not correct" });
    }
    const token = jwt.sign(
      { email: result.email, name: result.name.toString() },
      "bfnvjfcsdkbsdkjcv",
      { expiresIn: "1h" }
    );
    let data = {
      ...result.dataValues,
      password: "",
    };
    return res.status(200).json({
      status: 1,
      message: "login_success",
      data: {
        token: token,
        user: data,
      },
    });
  } catch (error) {
    return res.send(error);
  }
};

exports.getUserByEmail = async (req, res, email) => {
  try {
    const result = await User.findOne({ where: { email: email } });
    if (!result) {
      return res
        .status(200)
        .json({ status: 1, data: null, message: "User not exits" });
    }
    let data = {
      ...result.dataValues,
      password: "",
    };
    return {
      status: 1,
      data: data,
    };
  } catch (error) {
    return res.send(error);
  }
};

exports.allData = async (req, res, email) => {
  try {
    const result = await User.findAll();
    if (!result) {
      return res
        .status(200)
        .json({ status: 1, data: null, message: "User not exits" });
    }
    return res.status(200).json({
      status: 1,
      data: result,
    });
  } catch (error) {
    return res.send(error);
  }
};
