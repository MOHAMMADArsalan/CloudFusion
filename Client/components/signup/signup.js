angular
      .module("app.signup", [])

      .controller("SignupController", ["HttpService", "$state", SignupController]);

      function SignupController(HttpService, $state) {
        var _self = this;
        _self.user = {};
        _self.signup = function(user) {
             HttpService.PostApi("/router/signup",user).then(function(res){
                   console.log(res);
                   console.log(user);
                    _self.user = {};
                    $state.go("login");
             },function(err){
                   console.log(err);
             });

       };
      }
