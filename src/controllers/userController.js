import db from "../models/index";
import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let pass = req.body.pass;
  if (!email || !pass) {
    return res.status(500).json({
      errCode: 1,
      message: "null email",
    });
  }
  let data = await userService.handleUserLogin(email, pass);
  return res.status(200).json({
    data,
  });
};

module.exports = {
  handleLogin: handleLogin,
};
