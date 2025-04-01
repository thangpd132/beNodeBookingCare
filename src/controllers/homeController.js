import db from "../models/index";
import CRUDService from "../services/CRUDService";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log("ex: " + e);
  }
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};
let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDService.getUserInfoById(userId);
    return res.render("editUserInfo.ejs", { userData: userData });
  } else {
    return res.send("user not found");
  }
};
let displayGetCRUD = async (req, res) => {
  let data = await CRUDService.getAllUser();
  console.log(data);
  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};

let postCRUD = async (req, res) => {
  let meess = await CRUDService.createNewUser(req.body);
  console.log(meess);
  return res.send("post crud");
};

let putCRUD = async (req, res) => {
  let allUser = await CRUDService.updateUser(req.body);
  return res.render("displayCRUD.ejs", {
    dataTable: allUser,
  });
};
let delCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    let allUser = await CRUDService.delUser(id);
    console.log(allUser);
    return res.render("displayCRUD.ejs", {
      dataTable: allUser,
    });
  } else {
    return res.send("user not found");
  }
};

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  delCRUD: delCRUD,
};
