var express = require("express"),
  usermodel_1 = require("./usermodel"),
  bcrypt = require("bcrypt-nodejs");

function userSignin(req, res) {
    usermodel_1.UserModel.findOne({ email: req.body.username }, function (err, success) {
        if (success) {
            bcrypt.compare(req.body.password, success.password, function (err, isMatch) {
                done(err, isMatch);
            });
            function done(err2, isMatch) {
                isMatch ? res.send(success) : res.send(err);
            }
        }
        else {
            res.send(success);
        }
    });
}
exports.userSignin = userSignin;
function userSignup(req, res) {
            var user = new usermodel_1.UserModel(req.body);
            user.save(function (err, success) {
                if (err) {
                    res.send(err);
                }
                else {
                  console.log(success)
                    res.send({ message: "Inserted Successfully", token: success._id });
                }
            });
        }
exports.userSignup = userSignup;
