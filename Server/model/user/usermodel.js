/// <reference path="../../typings/tsd.d.ts" />
var bcrypt = require("bcrypt-nodejs");
var mongoose = require("mongoose");
var SALT_FACTOR = 10;

//Users Schema
var SignupSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role_admin: { type: Boolean, default: true },
    createdOn: { type: Date, default: Date.now() }
});
//Users Schema
var UserSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role_admin: { type: Boolean, default: false },
    createdOn: { type: Date, default: Date.now() }
});

//Bcrypt password
var noop = function () { };
SignupSchema.pre("save", function (done) {
    var user = this;
    if (!user.isModified("password")) {
        return done();
    }
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
            return done(err);
        }
        bcrypt.hash(user.password, salt, noop, function (err, hashedPassword) {
            if (err) {
                return done(err);
            }
            user.password = hashedPassword;
            done();
        });
    });
});
var UserModel = mongoose.model("users", SignupSchema);
exports.UserModel = UserModel;
var AddUserModel = mongoose.model("AddUsers", UserSchema);
exports.AddUserModel = AddUserModel;
