angular
  .module("app.accessGroupRole", [])

.controller("AccessGroupRoleController", ["mainRef", "DataService",
  "MessageService",
  "HttpService",
  AccessGroupRoleController
]);

function AccessGroupRoleController(mainRef, DataService, MessageService,
  HttpService) {
  var _self = this;
  DataService.getUserAccess().then(function(res) {
    angular.forEach(res, function(val) {
      if (val.role === "Administrator") {
        _self.AccessAdministrator = true;
        MessageService.progressbar.complete();
      }
    })
  })
  DataService.getGroupRole().then(function(res) {
    _self.groupRoles = res;
  });
  _self.deleteRole = function(id) {
    MessageService.progressbar.start();
    DataService.deleteGroupRole(id).then(function(res) {
      toastr.success(res);
      MessageService.progressbar.complete();

    }, function(err) {
      MessageService.progressbar.complete();
      toastr.error(err);
    })
  }
}
