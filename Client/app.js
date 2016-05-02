angular
  .module("CloudFusionControllerApp", ["ui.router",
    "app.signup",
    "app.resetPassword",
    "app.franchises",
    "app.forGetPassword",
    "app.addFranchises",
    "app.role",
    "app.addRole",
    "app.login",
    "app.home",
    "app.dashboard",
    "app.flight",
    "app.user",
    "app.adduser",
    "app.editUser",
    "app.editFranchises",
    "app.FranchiseEdit",
    "app.memberships",
    "app.term",
    "app.verify",
    "app.car",
    "app.addGroupRole",
    "app.accessGroupRole",
    "app.addMemberships",
    "app.Accommodation",
    'naif.base64',
    "ngCookies",
    "ngProgress",
    "firebase"
  ])
  .constant("mainRef", "https://cloudfusionv2.firebaseapp.com/")
  .controller("CloudFusionController", [CloudFusionController]);

function CloudFusionController() {
  var _self = this;
}
