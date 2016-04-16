var express = require("express"),
  postmark = require("postmark"),
  usercontroller = require("./userController");


var router = express.Router();

router.post("/signup", usercontroller.Signup);
router.post("/signin", usercontroller.Signin);
// router.post("/usersign", usercontroller.userSignin);
// router.post("/adduser", usercontroller.addUser);

router.get("/getuser", usercontroller.getuser);
router.get("/getRole", usercontroller.getRole);
router.post("/addRole", usercontroller.addRole);
router.get("/getOneUser/:id", usercontroller.getOneUser);
router.post("/editUser", usercontroller.editUser);
router.delete("/deleteUser/:id", usercontroller.deleteUser);
router.post("/addmember", usercontroller.addmember);
router.get("/getmember", usercontroller.getmember);
router.post("/forget", usercontroller.forget);
router.post("/passwordReset", usercontroller.passwordReset);
router.post("/addFranchises", usercontroller.addFranchises);
router.get("/getOneFranchises/:id", usercontroller.getOneFranchises);
router.get("/franchiseName", usercontroller.getFranchiseName);
router.post("/editFranchises", usercontroller.editFranchises);
router.get("/getFranchises", usercontroller.getFranchises);
router.get("/varify/:email/:id", usercontroller.varification);

module.exports = router;
