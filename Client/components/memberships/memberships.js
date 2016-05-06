angular
  .module("app.memberships", [])

.controller("MembershipsController", ["DataService", "MessageService",
  "HttpService", MembershipsController
]);

function MembershipsController(DataService, MessageService, HttpService) {
  var _self = this;
  _self.AllMembers = DataService.Memberships();
  DataService.getUserAccess().then(function(res) {
    angular.forEach(res, function(val) {
      if (val.role == "Memberships") {
        _self.readOnly = val.readOnly;
        _self.write = val.write;
        MessageService.progressbar.complete();
        // _self.AccessUser = val.noAccess;
      } else if (val.role === "Administrator") {
        _self.AccessAdministrator = true;
        MessageService.progressbar.complete();
      }
    })
  })

}
