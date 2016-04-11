angular
      .module("app.dashboard",[])

      .controller("DashboardController",["$state",DashboardController]);

      function DashboardController($state) {
        var _self = this;
        _self.logout = function() {
             localStorage.removeItem("token");
             $state.go("login");

      };
}
