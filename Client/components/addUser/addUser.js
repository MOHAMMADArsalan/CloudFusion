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
  DataService.getUserAccess().then(function(res) {
    angular.forEach(res, function(val) {
      if (val.role === "Administrator") {
        _self.AccessAdministrator = true;
        MessageService.progressbar.complete();
      }
    })
  })
  DataService.getGroupRole().then(function(res) {
    _self.Roles = res;
  });
  _self.cancelUser = function() {
    $state.go("dashboard.user");
  }
  _self.addSelectedRole = function(role) {
    if (role === "Dashboard") {
      _self.selectedRoles.push({
        role: role,
        show: false,
        hide: false
      })
    } else {
      _self.selectedRoles.push({
        role: role,
        noAccess: false,
        readOnly: false,
        write: false

      })
    }
  }
  _self.deleteRole = function(index) {
      _self.selectedRoles.splice(index, 1);
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
      angular.forEach(_self.Roles, function(val) {
          delete val.$$hashKey
          delete val.$id
          delete val.$priority

        })
        // delete user.role;
      user.roles = _self.Roles[user.role]
        //delete user.confirmpassword;
        // user.isActive = true;
      AuthService.signup(user).then(function(res) {
          $state.go("dashboard.user");
          toastr.success("User created successfully");
          MessageService.progressbar.complete();
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
