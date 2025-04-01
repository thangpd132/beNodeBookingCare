const { where } = require("sequelize");
import db from "../models/index";
import bcrypt from "bcryptjs";
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExit = await checkUserEmail(email);
      if (isExit) {
        resolve();
      } else {
        userData.code = -1;
        userData.mess = "Sai email";
        resolve(userData);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: email },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let compareUserPassword = (pass) => {
  return new Promise(async(resolve, reject) => {
    try {
      let pass
      let user = await db.User.findOne{

      }
    } catch (error) {
      reject(error)
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
};
