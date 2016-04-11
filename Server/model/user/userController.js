var express = require("express"),
  usermodel_1 = require("./usermodel"),
  bcrypt = require("bcrypt-nodejs");
// Main Sign in Function
function Signin(req, res) {
    usermodel_1.UserModel.findOne({ email: req.body.email }, function (err, success) {
        if (success) {
            bcrypt.compare(req.body.password, success.password, function (err, isMatch) {
                done(err, isMatch);
            });
            function done(err2, isMatch) {
                isMatch ? res.send({token: success._id}) : res.send(err);
            };
        }
        else {
            res.send(err);
        }
    });
}
exports.Signin = Signin;
// User Sign in Function
function userSignin(req, res) {
    usermodel_1.AddUserModel.findOne({ email: req.body.email }, function (err, success) {
        if (success) {
            bcrypt.compare(req.body.password, success.password, function (err, isMatch) {
                done(err, isMatch);
            });
            function done(err2, isMatch) {
                isMatch ? res.send({token: success._id}) : res.send(err);
            };
        }
        else {
            res.send(err);
        }
    });
}
exports.userSignin = userSignin;
// Get All User Function
function getuser(req, res) {
    usermodel_1.AddUserModel.find({}, function (err, success) {
        if (err) {
          res.send("Error to Find Data");
        }
        else {
            res.send(success);
        }
    });
}
exports.getuser = getuser;
// Main Sign up Function
function Signup(req, res) {
            var user = new usermodel_1.UserModel(req.body);
            user.save(function (err, success) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send({ message: "Inserted Successfully", token: success._id });
                }
            });
    }
exports.Signup = Signup;
// Add User Function
function addUser(req, res) {
            var user = new usermodel_1.AddUserModel(req.body);
            console.log(req.body);
            user.save(function (err, data) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send({ message: "Inserted Successfully", data: data });
                }
            });
        }
exports.addUser = addUser;
// Add Memberships Function
function addFranchises(req, res) {
            var user = new usermodel_1.FranchiseModel(req.body);
            console.log(req.body);
            user.save(function (err, data) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send({ message: "Inserted Successfully", data: data });
                }
            });
        }
exports.addFranchises = addFranchises;
// Add Memberships Function
function addmember(req, res) {
            var user = new usermodel_1.MembershipsModel(req.body);
            console.log(req.body);
            user.save(function (err, data) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send({ message: "Inserted Successfully", data: data });
                }
            });
        }
exports.addmember = addmember;
