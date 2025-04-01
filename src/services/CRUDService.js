import { where } from "sequelize";
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
      let users = db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};
let getUserInfoById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = await db.User.findOne({
        where: { id: id },
        raw: true,
      });
      if (userData) {
        resolve(userData);
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
};
let updateUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //let hassPass = await hashUserPass(data.pswd);
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        (user.email = data.email),
          (user.firstName = data.firstName),
          (user.lastName = data.lastName);
        await user.save();
        let allUser = await db.User.findAll();
        resolve(allUser);
      } else {
        resolve("update user false!");
      }
    } catch (error) {
      reject(error);
    }
  });
};
let delUser = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      //let hassPass = await hashUserPass(data.pswd);
      let user = await db.User.findOne({
        where: { id: id },
      });
      if (user) {
        await user.destroy();
        let allUser = await db.User.findAll({
          raw: true,
        });
        resolve(allUser);
      } else {
        resolve("update user false!");
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInfoById: getUserInfoById,
  updateUser: updateUser,
  delUser: delUser,
};
