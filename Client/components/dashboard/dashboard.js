angular
      .module("app.dashboard",[])

      .controller("DashboardController",["$state","AuthService",'$cookies','$cookieStore','$window',DashboardController]);

      function DashboardController($state,AuthService,$cookies,$cookieStore,$window) {
        var _self = this;
        _self.isCollapsed = false;
        _self.logout = function() {
             $cookieStore.remove("cloudToken");
             AuthService.LoggedIn = false;
             localStorage.removeItem("token");
             $state.go("login");

      };
}
