angular.module("app.editUser", [])

.controller("EditUserController", ["DataService", "MessageService",
  "HttpService", "$stateParams", "$state", EditUserController
]);

function EditUserController(DataService, MessageService, HttpService,
  $stateParams, $state) {
  var _self = this;
  _self.EditUser = {};
  _self.oldPassword = "";
  _self._id = $stateParams.id;
  _self.password = "";
  MessageService.progressbar.start();
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
    angular.forEach(_self.Roles, function(val) {
      if (val.name == _self.selectedOption) {
        _self.EditUser.role = val.name;
      }
    })
  });
  DataService.getOneUser(_self._id).then(function(res) {
    _self.EditUser = res;
    angular.forEach(_self.EditUser.roles.GroupRole, function(val) {
      if (val.role === "Administrator") {
        _self.currentRole = "Administrator";
      } else {
        _self.currentRole = _self.EditUser.roles.name
      }
    })
    _self.selectedOption = _self.EditUser.roles.name

  });

  _self.selectedRoles = [];
  DataService.getAllFranchiseName().then(function(res) {
    _self.AllFranchiceName = res;
    MessageService.progressbar.complete();
  }, function(err) {
    toastr.error("Error to load franchiseName")
    MessageService.progressbar.complete();
  });
  _self.deleteRole = function(item) {
    if (!isNaN(item)) {
      _self.EditUser.roles.splice(item, 1);
    } else {
      _self.selectedRoles.splice(_self.selectedRoles.indexOf(item), 1);
    }
  }
  _self.addSelectedRole = function(role) {
    angular.forEach(_self.EditUser.roles, function(val) {
      if (val.role === role) {} else {

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
    })

  }
  _self.update = function(user) {
      if (_self.oldPassword) {
        if (_self.confirmpassword != _self.password) {
          _self.message = "Password Does not Match"
        } else {
          delete user.$$conf;
          delete user.$priority;
          delete user.$id;
          angular.forEach(_self.Roles, function(val) {
            delete val.$$hashKey;
            delete val.$id
            delete val.$priority
          })
          angular.forEach(_self.Roles, function(val, i) {
            if (val.name == user.role) {
              user.roles = {
                GroupRole: val.GroupRole,
                name: val.name
              }
            }
          })
          DataService.updateUser(_self._id, user, _self.oldPassword, _self.password)
            .then(function(
              res) {
              $state.go("dashboard.user")
              toastr.success(res);
              MessageService.progressbar.complete();
            }, function(err) {
              toastr.error(err);
              MessageService.progressbar.complete();

            })
        }
      } else {
        delete user.$$conf;
        delete user.$priority;
        delete user.$id;
        angular.forEach(_self.Roles, function(val) {
          delete val.$$hashKey;
          delete val.$id
          delete val.$priority
        })
        angular.forEach(_self.Roles, function(val, i) {
          if (val.name == user.role) {
            user.roles = {
              GroupRole: val.GroupRole,
              name: val.name
            }
          }
        })
        DataService.updateUser(_self._id, user, _self.oldPassword, _self.password)
          .then(function(
            res) {
            $state.go("dashboard.user")
            toastr.success(res);
            MessageService.progressbar.complete();
          }, function(err) {
            toastr.error(err);
            MessageService.progressbar.complete();

          })
      }

    }
    // _self.Roles = DataService.getRoles();
    // // _self.AllFranchiceName = DataService.getFranchiseName();
    // if (_self.AllFranchiceName) {
    //   _self.EditUser.franchise = _self.AllFranchiceName[0].franchiseName
    // }


  // _self.emailExistError = "";
  // MessageService.progressbar.start();
  // _self.disable = false;
  //Get All Franchises
  //   HttpService.GetApi("/router/getFranchises")
  //                   .then(function(res){
  //                   MessageService.progressbar.complete();
  //                   _self.AllFranchice = res.data;
  //                   },function(err){
  //                   MessageService.progressbar.complete();
  //                        console.log(err);
  // });
  // HttpService.GetApi("/router/getOneUser/" + _self._id)
  //   .then(function(res) {
  //     MessageService.progressbar.complete();
  //     _self.EditUser = res.data;
  //     _self.EditUser.role = _self.Roles[0].name
  //   }, function(err) {
  //     MessageService.progressbar.complete();
  //     console.log(err);
  //   });

  // _self.editUser = function(user, pass) {
  //   _self.disable = true;
  //   MessageService.progressbar.start();
  //   user.password = pass;
  //   HttpService.PostApi("/router/editUser", user)
  //     .then(function(res) {
  //       toastr.success("User update Successfully");
  //       MessageService.progressbar.complete();
  //       _self.disable = false;
  //       $state.go("dashboard.user");
  //     }, function(err) {
  //       MessageService.progressbar.complete();
  //       _self.disable = false;
  //       toastr.success("Error To update User");
  //     })
  // }
}
