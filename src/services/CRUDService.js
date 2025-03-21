import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hassPass = await hashUserPass(data.pswd);
      await db.User.create({
        email: data.email,
        password: hassPass,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phonenumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
      });
      resolve("create a new user success!");
    } catch (error) {
      reject(error);
    }
  });
};

let hashUserPass = (pass) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hash = await bcrypt.hashSync(pass, salt);
      resolve(hash);
    } catch (e) {
      reject("loix: " + e);
    }
  });
};
let getAllUser = async () => {
  return new Promise((resolve, reject) => {
    try {
      let users = db.User.findAll();
    } catch (error) {}
  });
};
module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
};
