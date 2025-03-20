import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
  let hassPass = await hashUserPass(data.pswd);
  console.log("data from service");
  console.log(data);
  console.log(hassPass);
};

let hashUserPass = (pass) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("salt: " + salt);
      var hash = await bcrypt.hashSync(pass, salt);
      console.log("loi1:");
      resolve(hash);
    } catch (e) {
      reject("loix: " + e);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
};
