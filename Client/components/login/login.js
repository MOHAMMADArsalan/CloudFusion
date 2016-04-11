angular
      .module("app.login", [])

      .controller("LoginController", ["HttpService","$state", LoginController]);

      function LoginController(HttpService, $state) {
        var _self = this;
       _self.user = {};
       _self.rememberMe = false;
        _self.login = function(user) {
             HttpService.PostApi("/router/signin",user)
                                  .then(function(res){
                                       if(user.rememberMe) {
                                            localStorage.setItem("token",res.data._id);
                                            $state.go("dashboard.home");
                                       }
                                       else {
                                             $state.go("dashboard.home");
                                       }
                                  },function(error){
                                       console.log(error);
                                  });
        };
     }
