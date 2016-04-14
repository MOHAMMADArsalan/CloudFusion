angular.module("app.login", [])
    .controller("LoginController", ["MessageService","HttpService", "AuthService", "$state", '$cookies', '$cookieStore', '$window', LoginController]);

function LoginController(MessageService,HttpService, AuthService, $state, $cookies, $cookieStore, $window) {
    var _self = this;
    // _self.progressbar = ngProgressFactory.createInstance();

    var queryString = window.location.toString().split('?');
    // var x = abc.toString().split('?');
    _self.fromVerified = (queryString[1] && queryString[1] === 'verified=true') ? true : false;
    _self.message = (_self.fromVerified) ? "Account verified, please login to proceed" : "Please Sign In";
    _self.user = {};
    _self.disable = false;
    _self.login = function(user) {
        _self.disable = true;
        MessageService.progressbar.start();
        _self.ErrorUserNotExist = "";
        _self.varificationError = "";
        _self.Error = "";
        if (user !== "") {
            HttpService.PostApi("/router/signin", user).then(function(res) {
                if (res.data === "Please Varify Email") {
                    _self.varificationError = "Please Varify Your Email Address"
                    MessageService.progressbar.complete();
                    _self.disable = false;

                } else if (res.data === "Password does not match") {
                    _self.Error = "Email Or Password does not match";
                    MessageService.progressbar.complete();
                    _self.disable = false;
                }
                else if (res.data === "User Not Found with this Email Address") {
                    _self.ErrorUserNotExist = "User Not Found with this Email Address";
                    MessageService.progressbar.complete();
                    _self.disable = false;
                }
                else if (user.rememberMe) {
                    $cookieStore.put("cloudToken", res.data._id);
                    AuthService.isLoggedIn(res.data._id);
                    localStorage.setItem("token", res.data._id);
                    _self.fromVerified = false;
                    MessageService.progressbar.complete();
                   _self.disable = false;
                    $state.go("dashboard.home");
                }
                else {
                    $cookieStore.put("cloudToken", res.data._id);
                    AuthService.isLoggedIn(res.data._id);
                    _self.fromVerified = false;
                    MessageService.progressbar.complete();
                    _self.disable = false;
                    $state.go("dashboard.home");
                }
            }, function(error) {
                console.log(error);
                MessageService.progressbar.complete();
                _self.disable = false;
            });
        }
    };
}
