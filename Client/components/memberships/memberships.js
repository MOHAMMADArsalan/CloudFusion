angular
  .module("app.memberships", [])

.controller("MembershipsController", ["DataService", "MessageService",
  "HttpService", MembershipsController
]);

function MembershipsController(DataService, MessageService, HttpService) {
  var _self = this;
  _self.AllMembers = HttpService.getMember();
  _self.AllMembers = _self.AllMembers.concat(DataService.getmember());

}
