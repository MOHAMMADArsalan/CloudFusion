var express = require("express"),
    usercontroller = require("./userController");


var router = express.Router();

router.post("/signup", usercontroller.userSignup);

module.exports= router;
