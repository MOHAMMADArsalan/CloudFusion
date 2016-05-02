angular
  .module("app.addGroupRole", [])

.controller("AddGroupRoleController", ["mainRef", "DataService",
  "MessageService",
  "HttpService", "$state",
  AddGroupRoleController
]);

function AddGroupRoleController(mainRef, DataService, MessageService,
  HttpService, $state) {
  var _self = this;
  _self.Roles = DataService.allRole();
  _self.selectedRoles = [];
  _self.isRole = true;
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
    _self.isRole = false;
  }
  _self.deleteRole = function(index) {
    _self.selectedRoles.splice(index, 1);
  }
  _self.makeGroup = function(groupRole) {
      groupRole.GroupRole = _self.selectedRoles;
      MessageService.progressbar.start()
      if (_self.selectedRoles) {
        angular.forEach(_self.selectedRoles, function(val) {
          delete val.$$hashKey;
        })
        DataService.addGroupRole(groupRole).then(function(res) {
          MessageService.progressbar.complete()
          toastr.success("Group Role Add Successfully");
          $state.go("dashboard.accessGroupRole");
        }, function(err) {
          toastr.error("Error to Make Group Role");
          MessageService.progressbar.complete();
        })
      } else {
        MessageService.progressbar.complete()
        toastr.error("Please Selected Role");
      }

    }
    // _self.cancelUser = function() {
    //   $state.go("dashboard.accessGroupRole");
    // }
}
