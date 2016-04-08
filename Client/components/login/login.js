angular
      .module("app.login", [])

      .controller("LoginController", [LoginController]);

      function LoginController() {
        var _self = this;
       _self.user = {};
        _self.login = function(user) {
             console.log(user);
              _self.user = {};
        };
        _self.rememberMe = function() {
             var rememberMe = localStorage.getItem("token");
             if(rememberMe) {
               localStorage.removeItem("token");
             }
             else {
            localStorage.setItem("token","abc");
             }
        };
     }
