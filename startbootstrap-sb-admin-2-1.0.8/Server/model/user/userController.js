var express = require("express"),
  usermodel_1 = require("./usermodel"),
  postmark = require("postmark"),
  bcrypt = require("bcrypt-nodejs");
// Main Sign in Function
function Signin(req, res) {
    usermodel_1.UserModel.findOne({ email: req.body.email }, function (err, success) {
        if (success) {
            bcrypt.compare(req.body.password, success.password, function (err, isMatch) {
                done(err, isMatch);

            });
            function done(err2, isMatch) {
            if(isMatch) {
                usermodel_1.UserModel.update({ email: req.body.email },{$set: {timestamp: Date.now()}},function(err,data){
                  var userDetails = {
                               uid:data._id,
                               name:data.firstName+" "+data.lastName,
                               role:data.role
                 }
                  res.send(success);

                })
            }else{
              res.send("Password does not match");
            }
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
// Forget Function
function forget(req, res) {
  console.log(req);
    usermodel_1.UserModel.findOne({email: req.body.email}, function (err, success) {
        if (err) {
          res.send("Error to Find Data");
        }
        else if(success === null){
          usermodel_1.AddUserModel.findOne({email: req.body.email}, function (err, success) {
              if (err) {
                res.send("Error to Find Data");
              }
              else {
                res.send(success);
                // sendPasswordRecoveryEmail(user);
                //   res.send({
                //       statusDesc: "you would receive an email with a password recovery link, shortly."
                //   });
              }
          });
          // sendPasswordRecoveryEmail(user);
          //   res.send({
          //       statusDesc: "you would receive an email with a password recovery link, shortly."
          //   });
        }
        else {
            res.send(success);
        }
    });
}
exports.forget = forget;
// Password reset Function
function passwordReset(req, res) {
  console.log(req);
    usermodel_1.UserModel.findOne({_id: req.query.token}, function (err, success) {
     if(success) {
       bcrypt.compare(req.body.password, success.password, function (err, isMatch) {
           done(err, isMatch);

       });
     }

      function done(err2, isMatch) {
      if(isMatch) {
          usermodel_1.UserModel.update({ _id: req.query.token },{$set: {password: req.body.newPassword}},function(err,data){
            res.send(success);

          })
    } else if (!isMatch) {
      usermodel_1.AddUserModel.findOne({ _id: req.query.token },function(err,success) {
        usermodel_1.AddUserModel.update({ _id: req.query.token },{$set: {password: req.body.newPassword}},function(err,data){
          res.send(success);

        })
      })

   }
   else{
     res.send("Password does not match");
   }
  };
    });
}
exports.passwordReset = passwordReset;
// Get All Franchises Function
function getFranchises(req, res) {
    usermodel_1.FranchiseModel.find({},{franchiseName: 1, "_id" : 0}, function (err, success) {
        if (err) {
          res.send("Error to Find Data");
        }
        else {
            res.send(success);
        }
    });
}
exports.getFranchises = getFranchises;
// Get All Memberships Function
function getmember(req, res) {
    usermodel_1.MembershipsModel.find({},{contactNumber: 1, firstName: 1 , lastName: 1 ,"_id" : 0}, function (err, success) {
        if (err) {
          res.send("Error to Find Data");
        }
        else {
            res.send(success);
        }
    });
}
exports.getmember = getmember;
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

  // function sendPasswordRecoveryEmail(user) {
  //
  //
  //       ////using postmark
  //       var payload = {
  //           "To": user.email,
  //           "From": "Arslaan",
  //           "Subject": 'Account Recovery Email - "' + "cloudfusion",
  //           "HtmlBody": "<h1>Hello wolrd</h1>"
  //
  //       };
  //       postmark.sendEmail(payload,function(err, json) {
  //           if (err) {
  //               console.log('email sent error: ' + user.email);
  //               return console.error(err.message);
  //           }
  //
  //           console.log('email sent success: ' + user.email);
  //           console.log(json);
  //       });
  //   }
  //
