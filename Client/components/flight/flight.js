angular
  .module("app.flight", [])

.controller("FlightController", ["DataService", "MessageService",
  FlightController
]);

function FlightController(DataService, MessageService) {
  var _self = this;
  MessageService.progressbar.start();
  var roles = DataService.Role();
  document.getElementById("iframe").onload = function() {
    angular.forEach(roles, function(val) {
      if (val.role == "Flights") {
        _self.readOnly = val.readOnly;
        _self.write = val.write;
        MessageService.progressbar.complete();
      }
    })
  }
}
