angular
    .module("app.dashboard", [])

    .controller("DashboardController", ["$state", "AuthService", '$cookies', '$cookieStore', '$window', DashboardController]);

function DashboardController($state, AuthService, $cookies, $cookieStore, $window) {
    var _self = this;
    _self.isCollapsed = false;
    _self.logout = function() {
        $cookieStore.remove("cloudToken");
        AuthService.LoggedIn = false;
        localStorage.removeItem("token");
        $state.go("login");

    };


    _self.isOpen = true;

    _self.hideSideBar = function () {
        console.log('abc')
        if (_self.isOpen) {
            _self.isOpen = false;
           _self.applyClass = true
        }else {
            _self.isOpen = true;
            _self.applyClass = false;
        }
    }


}
