angular
  .module("app.adduser", [])

.controller("AddUserController", ["mainRef", "DataService", "MessageService",
  "AuthService",
  "HttpService", "$state", AddUserController
]);

function AddUserController(mainRef, DataService, MessageService, AuthService,
  HttpService, $state) {
  var _self = this;
  _self.error = "";
  var mainRef = new Firebase("https://cloudfusionv2.firebaseio.com/");
  _self.selectedRoles = [];
  //Get all Roles
  _self.user = {}
  _self.Roles = DataService.allRole();

  _self.addSelectedRole = function(role) {
      console.log(role)
      _self.selectedRoles.push({
        role: role,
        noAccess: false,
        readOnly: true,
        write: false

      })
    }
    // Get All Franchise Name

  MessageService.progressbar.start();
  DataService.getAllFranchiseName().then(function(res) {
    _self.AllFranchiceName = res;
    MessageService.progressbar.complete();
  }, function(err) {
    toastr.error("Error to load franchiseName")
    MessageService.progressbar.complete();
  });


  _self.addUser = function(user) {
    MessageService.progressbar.start();
    if (user.confirmpassword != user.password) {
      toastr.error("password does not match");
      MessageService.progressbar.complete();
    } else {
      angular.forEach(_self.selectedRoles, function(val) {
        delete val.$$hashKey
      })
      delete user.role;
      user.roles = _self.selectedRoles;
      delete user.confirmpassword;
      AuthService.signup(user).then(function(res) {
          toastr.success("User created successfully");
          MessageService.progressbar.complete();
          $state.go("dashboard.user");
          _self.user = {}
        }, function(err) {
          toastr.error("Error to add User");
          MessageService.progressbar.complete();
          _self.user = {};
        })
        // HttpService.PostApi("/router/signup", user).then(function(res) {
        //
        //   if (res.data === "Email is ALready exist") {
        //     MessageService.progressbar.complete();
        //     toastr.error("Email is already exist");
        //   } else {
        //     toastr.success("User added");
        //
        //     _self.user = {};
        //     MessageService.progressbar.complete();
        //
        //   }
        //
        // }, function(err) {
        //   toastr.error(err);
        // });
    }

  };
}
