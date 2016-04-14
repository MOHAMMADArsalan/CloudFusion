var express = require("express"),
    usermodel_1 = require("./usermodel"),
    postmark = require("postmark"),
    bcrypt = require("bcrypt-nodejs"),
    md5 = require("md5"),
    postmark = require('postmark');
var postmarkEmail = new postmark.Client("a96e9e41-6f92-484a-a7f6-c601e82a70fb");
var SALT_FACTOR = 10;

// Main Sign in Function
function Signin(req, res) {
    usermodel_1.UserModel.findOne({ email: req.body.email }, function(err, success) {
        console.log(err , success);
            if (success) {
                if(success.status == 1) {
                    bcrypt.compare(req.body.password, success.password, function(err, isMatch) {
                        done(err, isMatch);

                    });
                    function done(err2, isMatch) {
                        if (isMatch) {
                            usermodel_1.UserModel.update({ email: req.body.email }, { $set: { timestamp: Date.now() } }, function(err, data) {
                                res.send(success);

                            })
                        } else {
                            res.send("Password does not match");
                        }
                    }
                }

            }
            else {
                res.send("User Not Found with this Email Address");
            }


    });
}
exports.Signin = Signin;
// User Sign in Function
// function userSignin(req, res) {
//     usermodel_1.AddUserModel.findOne({ email: req.body.email }, function(err, success) {
//         if (success) {
//             bcrypt.compare(req.body.password, success.password, function(err, isMatch) {
//                 done(err, isMatch);
//             });
//             function done(err2, isMatch) {
//                 isMatch ? res.send({ token: success._id }) : res.send(err);
//             }
//         }
//         else {
//             res.send(err);
//         }
//     });
// }
// exports.userSignin = userSignin;
// Get All User Function
function getuser(req, res) {
    usermodel_1.UserModel.find({}, function(err, success) {
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
    usermodel_1.UserModel.findOne({ email: req.body.email }, function(err, success) {
        if (err) {
            res.send("Error to Find Data");
        }
        else if (success === null) {
            usermodel_1.AddUserModel.findOne({ email: req.body.email }, function(err, success) {
                if (err) {
                    res.send("Error to Find Data");
                }
                else {
                    //sending email...
                    sendPasswordRecoveryEmail(success);
                    res.send(success);
                }
            });
        }
        else {
            //sending email...
            sendPasswordRecoveryEmail(success);
            res.send(success);
        }
    });
}
exports.forget = forget;
// Password reset Function
function passwordReset(req, res) {
    console.log(req);
    usermodel_1.UserModel.findOne({ _id: req.query.token }, function(err, success) {
        if (success) {
            bcrypt.compare(req.body.password, success.password, function(err, isMatch) {
                done(err, isMatch);

            });
        }

        function done(err2, isMatch) {
            if (isMatch) {
                bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
                    if (err) {
                        return done(err);
                    }
                    bcrypt.hash(req.body.newPassword, salt, null, function(err, hashedPassword) {
                        if (err) {
                            return done(err);
                        }
                        usermodel_1.UserModel.update({ _id: req.query.token }, { $set: { password: hashedPassword } }, function(err, data) {
                            res.send(success);

                        });

                    });
                });

            } else if (!isMatch) {
                usermodel_1.AddUserModel.findOne({ _id: req.query.token }, function(err, success) {
                    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
                        if (err) {
                            return done(err);
                        }
                        bcrypt.hash(req.body.newPassword, salt, null, function(err, hashedPassword) {
                            if (err) {
                                return done(err);
                            }
                            usermodel_1.AddUserModel.update({ _id: req.query.token }, { $set: { password: hashedPassword } }, function(err, data) {
                                res.send(success);

                            });
                        });

                    });
                });

            }
            else {
                res.send("Password does not match");
            }
        }
    });
}
exports.passwordReset = passwordReset;
// Get All Franchises Function
function getFranchises(req, res) {
    usermodel_1.FranchiseModel.find({}, { franchiseName: 1, "_id": 0 }, function(err, success) {
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
    usermodel_1.MembershipsModel.find({}, { contactNumber: 1, firstName: 1, lastName: 1, "_id": 0 }, function(err, success) {
        if (err) {
            res.send("Error to Find Data");
        }
        else {
            res.send(success);
        }
    });
}
exports.getmember = getmember;
// Get All Memberships Function
function varification(req, res) {
    usermodel_1.AddUserModel.findOne({email: req.params.email}, function(err, success) {
        if (err) {
            res.send("Error to Find Data");
        }
        else {
            if(success.varifyToken == req.params.id) {
                success.status = 1;
                success.save(function(err, success){
                    if(err){
                        console.log(err);
                    }
                    else {
                        console.log(success)
                        res.send(success);
                    }
                })
            };

        }
    });
}
exports.varification = varification;
// Main Sign up Function
function Signup(req, res) {
    //token generate..
    var varifyToken = md5(req.body.email + Date.now());
    req.body.varifyToken = varifyToken;
    req.body.status = 0;
    var user = new usermodel_1.UserModel(req.body);
    user.save(function(err, _user) {
        if (err) {
            res.send("Email is ALready exist");
        }
        else {
            //email verification
            emailVerification(_user.email, _user.varifyToken);
            res.send({ message: "Inserted Successfully", token: _user._id });
        }
    });
}
exports.Signup = Signup;
// // Add User Function
// function addUser(req, res) {
//     var user = new usermodel_1.AddUserModel(req.body);
//     console.log(req.body);
//     user.save(function(err, data) {
//         if (err) {
//             res.send(err);
//         }
//         else {
//             res.send({ message: "Inserted Successfully", data: data });
//         }
//     });
// }
// exports.addUser = addUser;
// Add Memberships Function
function addFranchises(req, res) {
    var user = new usermodel_1.FranchiseModel(req.body);
    console.log(req.body);
    user.save(function(err, data) {
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
    user.save(function(err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send({ message: "Inserted Successfully", data: data });
        }
    });
}
exports.addmember = addmember;


function sendPasswordRecoveryEmail(user) {
    var template = {
        "To": user.email,
        "From": "test@holidaycorp.co.za",
        "Subject": 'Account Recovery Email',
        "HtmlBody": "<h1>Recovery Email</h1>, your password is: " + user.password
    };
    postmarkEmail.sendEmail(template,function(err, json) {
        if (err) {
            console.log('email sent error: ' + user.email);
            return console.error(err.message);
        }

        console.log('email sent success: ' + user.email);
        console.log(json);
    });
}

function emailVerification(email, token) {
    console.log(email , token)
    var template = {
        "To": email,
        "From": "test@holidaycorp.co.za",
        "Subject": 'Please Verify your Email',
        "HtmlBody": "<h1>Verify Email</h1>, please link on this link for email verification: https://cloudfussion.herokuapp.com/verify/"+ email +  "/" +  token
    };
    postmarkEmail.sendEmail(template,function(err, json) {
        if (err) {
            console.log('email sent error: ' + email);
            return console.error(err.message);
        }

        console.log('email sent success: ' + email);
        console.log(json);
    });
}
