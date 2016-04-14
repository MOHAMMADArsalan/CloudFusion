angular
    .module("app.dashboard", [])

    .controller("DashboardController", ["$state", "AuthService", '$cookies', '$cookieStore', '$window', DashboardController]);

function DashboardController($state, AuthService, $cookies, $cookieStore, $window) {

    var _self = this;


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
        console.log('abc')
        if (_self.isOpen) {
            _self.isOpen = false;
            _self.applyClass = true
        } else {
            _self.isOpen = true;
            _self.applyClass = false;
        }
    }


}
