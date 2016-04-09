var express = require("express"),
    usercontroller = require("./userController");


var router = express.Router();

router.post("/signup", usercontroller.userSignup);
router.post("/signin", usercontroller.userSignin);
router.post("/adduser", usercontroller.addUser);
router.get("/getuser", usercontroller.getuser);

module.exports= router;
