angular
      .module("app.signup", [])

      .controller("SignupController", ["$state", SignupController]);

      function SignupController($state) {
        var _self = this;
        _self.user = {};
        _self.signup = function(user) {
             console.log(user);
               _self.user = {};
               $state.go("login");
       };
      }
