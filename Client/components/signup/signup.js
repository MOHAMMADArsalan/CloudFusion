angular
      .module("app.signup", [])

      .controller("SignupController", ["HttpService", "$state", SignupController]);

      function SignupController(HttpService, $state) {
        var _self = this;
        _self.user = {};
        _self.signup = function(user) {
             HttpService.PostApi("/router/signup",user).then(function(res){
                  if(res.data === "Email is ALready exist") {
                        _self.emailExistError = "Email is ALready exist"
                  }
                  else {
                        _self.user = {};
                        $state.go("login");
                  }

             },function(err){
                   console.log(err);
             });

       };
      }
