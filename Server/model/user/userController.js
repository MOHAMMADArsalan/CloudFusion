var express = require("express"),
  usermodel_1 = require("./usermodel"),
  bcrypt = require("bcrypt-nodejs");

function userSignin(req, res) {
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
exports.userSignin = userSignin;
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

function userSignup(req, res) {
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
exports.userSignup = userSignup;
function addUser(req, res) {
  console.log(req.body);
            var user = new usermodel_1.AddUserModel(req.body);
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
