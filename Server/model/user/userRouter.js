var express = require("express"),
    usercontroller = require("./userController");


var router = express.Router();

router.post("/signup", usercontroller.Signup);
router.post("/signin", usercontroller.Signin);
router.post("/usersign", usercontroller.userSignin);
router.post("/adduser", usercontroller.addUser);
router.get("/getuser", usercontroller.getuser);
router.post("/addmember", usercontroller.addmember);
router.get("/getmember", usercontroller.getmember);
router.post("/addFranchises", usercontroller.addFranchises);
router.get("/getFranchises", usercontroller.getFranchises);

module.exports= router;
