angular

  .module("app.role", [])

.controller("AccessRoleController", ["DataService", AccessRoleController]);

function AccessRoleController(DataService) {
  var _self = this;
  // _self.Roles = DataService.getRoles();
  console.log(_self.Roles);
}
