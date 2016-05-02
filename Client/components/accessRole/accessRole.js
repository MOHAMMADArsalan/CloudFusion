angular

  .module("app.role", [])

.controller("AccessRoleController", ["DataService", AccessRoleController]);

function AccessRoleController(DataService) {
  var _self = this;
  _self.Roles = DataService.allRole();
  _self.mainRef = new Firebase("https://cloudfusionv2.firebaseio.com/");
  _self.deleteRole = function(id) {
    _self.mainRef.child("Roles").child(id).set(null);
    toastr.success("Role delete successfully");
  }
}
