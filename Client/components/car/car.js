angular
  .module("app.car", [])

.controller("CarController", ["DataService", "MessageService", CarController]);

function CarController(DataService, MessageService) {
  var _self = this;
  MessageService.progressbar.start();
  var roles = DataService.Role();

  document.getElementById("iframe").onload = function() {
    angular.forEach(roles, function(val) {
        if (val.role == "Cars") {
          _self.readOnly = val.readOnly;
          _self.write = val.write;
          MessageService.progressbar.complete();
        }
      })
      // DataService.getOneAccess().then(function(res) {
      //   if (res.role == "Cars") {
      //     _self.readOnly = res.readOnly;
      //     _self.write = res.write;
      //     MessageService.progressbar.complete();
      //   }
      // })
  }
}
