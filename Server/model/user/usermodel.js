/// <reference path="../../typings/tsd.d.ts" />
var bcrypt = require("bcrypt-nodejs");
var mongoose = require("mongoose");
var SALT_FACTOR = 10;

//Signup Schema
var SignupSchema = new mongoose.Schema({
    franchise: { type: String },
    active: {type: Boolean , default: true},
    firstname: { type: String },
    lastname: { type: String },
    username: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: Number },
    varifyToken: { type: String },
    role_admin: { type: Boolean, default: true },
    access_role: { type: String },
    timestamp: { type: Date, default: Date.now()},
    createdOn: { type: Date, default: Date.now() }
});
//Users Schema
// var UserSchema = new mongoose.Schema({
//     franchise: { type: String, required: true },
//     active: {type: Boolean},
//     firstname: { type: String, required: true },
//     lastname: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     access_role: { type: String, required: true },
//     timestamp: { type: Date, default: Date.now()},
//     createdOn: { type: Date, default: Date.now() }
// });
//Add franchise Schema
var FranchiseSchema = new mongoose.Schema({
    franchiseName:  { type: String, required: true },
    entries:  { type: String, required: true },
    email: { type: String, required: true, unique: true },
    physicalAddress:  { type: String },
    subrub: { type: String },
    country: {type: String},
    city: { type: String },
    province: { type: String },
    areaCode: {type: String},
    postalAddressSameAs: {type: Boolean},
    address:  { type: String },
    postalsubrub: { type: String },
    postalCity: { type: String },
    postalProvince: { type: String },
    postalCountry: {type: String},
    postalCode: {type: String},
    registeredName: { type: String },
    tradingName: { type: String },
    registrationNumber: { type: String },
    vatNumber: { type: String },
    directorFirstName: { type: String },
    directorLastName: { type: String },
    alternateEmail: { type: String},
    telephoneNumber: { type: String},
    fax: { type: String},
    mobileNumber: { type: String},
    ID : { type: String},
    firstName: { type: String},
    lastName: { type: String},
    workNumber: { type: String},
    proofAddress: {type: Object},
    identityDocument: {type: Object},
    companyRegistration: {type: Object},
    createdOn: { type: Date, default: Date.now() }
});
//Add MembershipsSchema
var MembershipsSchema = new mongoose.Schema({
    franchise:  { type: String, required: true },
    contactNumber: { type: String},
    memberships: {type: Boolean},
    country: {type: String},
    ID : { type: String},
    firstName: { type: String},
    lastName: { type: String},
    language: { type: String},
    physicalAddress:  { type: String },
    subrub: { type: String },
    city: { type: String },
    province: { type: String },
    areaCode: {type: String},
    postalAddressSameAs: {type: Boolean},
    address:  { type: String },
    postalsubrub: { type: String },
    postalCity: { type: String },
    postalProvince: { type: String },
    postalCountry: {type: String},
    postalCode: {type: String},
    telephoneNumber: { type: String},
    Fax: { type: String},
    mobileNumber: { type: String},
    email: { type: String, required: true, unique: true },
    bankName: { type: String},
    branchName: { type: String},
    branchCode: { type: String},
    accountType: { type: String},
    accountNumber: { type: String},
    repaymentAmount: { type: String},
    repaymentDay: { type: String},
    repaymentMonth: { type: String},
    repaymentYear: { type: String},
    originalDocument: {type: Object},
    createdOn: { type: Date, default: Date.now() }
});

// Signup Bcrypt password
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
// UserSchema Bcrypt password
// var noop = function () { };
// UserSchema.pre("save", function (done) {
//     var user = this;
//     if (!user.isModified("password")) {
//         return done();
//     }
//     bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
//         if (err) {
//             return done(err);
//         }
//         bcrypt.hash(user.password, salt, noop, function (err, hashedPassword) {
//             if (err) {
//                 return done(err);
//             }
//             user.password = hashedPassword;
//             done();
//         });
//     });
// });
var UserModel = mongoose.model("users", SignupSchema);
exports.UserModel = UserModel;
// var AddUserModel = mongoose.model("AddUsers", UserSchema);
// exports.AddUserModel = AddUserModel;
var MembershipsModel = mongoose.model("Memberships", MembershipsSchema);
exports.MembershipsModel = MembershipsModel;
var FranchiseModel = mongoose.model("Franchise", FranchiseSchema);
exports.FranchiseModel = FranchiseModel;
