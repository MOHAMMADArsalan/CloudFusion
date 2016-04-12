angular
      .module("app.login", [])

      .controller("LoginController", ["HttpService","AuthService","$state",LoginController]);

      function LoginController(HttpService,AuthService, $state) {
        var _self = this;
       _self.user = {};
        _self.login = function(user) {
             HttpService.PostApi("/router/signin",user)
                                  .then(function(res){
                                       if(res.data === "Password does not match"){
                                            _self.error = "Password does not match";
                                       }
                                       else if(user.rememberMe){
                                            AuthService.isLoggedIn(res.data._id);
                                            localStorage.setItem("token",res.data._id);
                                            $state.go("dashboard.home");
                                       }
                                       else {
                                             console.log(res);
                                            AuthService.isLoggedIn(res.data._id);
                                            localStorage.setItem("token",res.data._id);
                                            $state.go("dashboard.home");
                                    }

                                  },function(error){
                                       console.log(error);
                                  });
        };
     }
