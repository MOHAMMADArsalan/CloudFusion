angular

  .module("app.role", [])

.controller("AccessRoleController", ["DataService", "MessageService",
  AccessRoleController
]);

function AccessRoleController(DataService, MessageService) {
  var _self = this;
  _self.Roles = DataService.allRole();
  _self.mainRef = new Firebase("https://cloudfusionv2.firebaseio.com/");
  DataService.getUserAccess().then(function(res) {
    angular.forEach(res, function(val) {
      if (val.role === "Administrator") {
        _self.AccessAdministrator = true;
        MessageService.progressbar.complete();
      }
    })
  })
  _self.deleteRole = function(id) {
    _self.mainRef.child("Roles").child(id).set(null);
    toastr.success("Role delete successfully");
  }
}
