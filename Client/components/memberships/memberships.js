angular
  .module("app.memberships", [])

.controller("MembershipsController", ["DataService", "MessageService",
  "HttpService", MembershipsController
]);

function MembershipsController(DataService, MessageService, HttpService) {
  var _self = this;
  _self.AllMembers = DataService.Memberships();
  var roles = DataService.Role();
  angular.forEach(roles, function(val) {
    if (val.role == "Administrator") {
      _self.readOnly = true;
      _self.write = true;
      MessageService.progressbar.complete();
    } else if (val.role === "Memberships") {
      _self.readOnly = val.readOnly;
      _self.write = val.write;
      MessageService.progressbar.complete();
    }
  })
}
