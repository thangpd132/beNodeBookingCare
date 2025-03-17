import express from "express";
import bodyParser from "body-parser";
import viewEnging from "./config/viewEngine";
import initWebRoute from "./route/web";
import connectDb1 from "./config/connectDB";
require('dotenv').config();
let app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
viewEnging(app);
initWebRoute(app);
connectDb1();
let port = process.env.PORT || 6969;
app.listen(port, ()=> {
    console.log("be node js: "+port);
});
