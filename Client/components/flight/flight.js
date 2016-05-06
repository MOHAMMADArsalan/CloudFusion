angular
  .module("app.flight", [])

.controller("FlightController", ["DataService", "MessageService",
  FlightController
]);

function FlightController(DataService, MessageService) {
  var _self = this;
  MessageService.progressbar.start();
  document.getElementById("iframe").onload = function() {
    DataService.getUserAccess().then(function(res) {
      angular.forEach(res, function(val) {
        if (val.role == "Flights") {
          _self.readOnly = val.readOnly;
          _self.write = val.write;
          MessageService.progressbar.complete();
        } else if (val.role === "Administrator") {
          _self.AccessAdministrator = true;
          MessageService.progressbar.complete();
        }
      })
    })
  }

}
