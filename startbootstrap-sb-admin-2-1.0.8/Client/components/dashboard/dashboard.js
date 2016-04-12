angular
      .module("app.dashboard",[])

      .controller("DashboardController",["$state","AuthService",DashboardController]);

      function DashboardController($state,AuthService) {
        var _self = this;
        console.log(AuthService.userId)
        _self.logout = function() {

             AuthService.LoggedIn = false;
             localStorage.removeItem("cloudfusion:rememberToken");
             localStorage.removeItem("token");
             $state.go("login");

      };
}
