angular
  .module("app.home", [])

.controller("HomeController", ["DataService", HomeController]);

function HomeController(DataService) {
  var _self = this;
  DataService.getUserAccess().then(function(res) {
    angular.forEach(res, function(val) {
      if (res.role === "Dashboard") {
          _self.Access = val.show;
      }
    })
  })
}
