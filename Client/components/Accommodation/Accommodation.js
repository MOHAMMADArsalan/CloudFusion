angular.module("app.Accommodation", [])
  .controller("AccommodationController", ["MessageService", "DataService",
    AccommodationController
  ]);

function AccommodationController(MessageService, DataService) {
  var _self = this;
  MessageService.progressbar.start();
  var roles = DataService.Role();
  document.getElementById("iframe").onload = function() {
    DataService.getUserAccess().then(function(res) {
      angular.forEach(res, function(val) {
        if (val.role == "Accommodation") {
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
