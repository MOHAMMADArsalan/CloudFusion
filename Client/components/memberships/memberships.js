angular
  .module("app.memberships", [])

.controller("MembershipsController", ["DataService", "MessageService",
  "HttpService", MembershipsController
]);

function MembershipsController(DataService, MessageService, HttpService) {
  var _self = this;
  _self.AllMembers = DataService.Memberships();

}
