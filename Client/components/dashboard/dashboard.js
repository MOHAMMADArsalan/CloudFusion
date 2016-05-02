angular
  .module("app.dashboard", [])

.controller("DashboardController", ["$state", "AuthService",
  '$cookies', "DataService",
  '$cookieStore', '$window', DashboardController
]);

function DashboardController($state, AuthService, $cookies, DataService,
  $cookieStore,
  $window) {

  var _self = this;
  _self.Access = "";
  DataService.getUser().then(function(res) {
    _self.username = res;
  });
  DataService.getUserAccess().then(function(res) {
    angular.forEach(res, function(val) {
      if (val.role == "Users") {
        // _self.AccessUser = val.noAccess;
      } else if (val.role === "Dashboard") {
        _self.AccessDashboard = val.show;
      } else if (val.role === "Franchises") {
        _self.AccessFranchises = val.noAccess;
      } else if (val.role === "Memberships") {
        _self.AccessMemberships = val.noAccess;
      } else if (val.role === "Flights") {
        _self.AccessFlights = val.noAccess;
      } else if (val.role === "Cars") {
        _self.AccessCars = val.noAccess;
      } else if (val.role === "Accommodation") {
        _self.AccessAccommodation = val.noAccess;
      } else if (val.role === "Administrator") {
        _self.AccessAdministrator = true;
      }
    })
  })
  var width = window.innerWidth;
  // var height = window.innerHeight;
  // console.log(typeof width + ":" + height);
  if (width > 768) {
    var classes = document.getElementsByClassName('foo')
    for (var i = 0; i < classes.length; i++) {
      classes[i].removeAttribute('data-target');
      classes[i].removeAttribute('data-toggle');
    }
  }


  _self.isCollapsed = false;
  _self.logout = function() {
    $cookieStore.remove("cloudToken");
    AuthService.LoggedIn = false;
    localStorage.removeItem("token");
    $state.go("login");

  };


  _self.isOpen = true;

  _self.hideSideBar = function() {
    if (_self.isOpen) {
      _self.isOpen = false;
      _self.applyClass = true
    } else {
      _self.isOpen = true;
      _self.applyClass = false;
    }
  }


}
