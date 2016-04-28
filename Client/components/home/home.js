angular
  .module("app.home", [])

.controller("HomeController", ["DataService", HomeController]);

function HomeController(DataService) {
  var _self = this;
  DataService.getUserAccess().then(function(res) {
    angular.forEach(res, function(val) {
      if (val.role === "Dashboard") {
        _self.Access = val.show;
      } else if (val.role === "Administrator") {
        _self.AccessAdministrator = true
      }
    })
  })
}
