angular
      .module("app.login", [])

      .controller("LoginController", ["HttpService","$state", LoginController]);

      function LoginController(HttpService, $state) {
        var _self = this;
       _self.user = {};
       _self.rememberMe = false;
        _self.login = function(user) {
              if(user.rememberMe) {
                   HttpService.PostApi("/router/signin",user)
                                        .then(function(res){
                                             localStorage.setItem("rememberMe",res.data.token);
                                             localStorage.setItem("token",res.data.token);
                                             $state.go("dashboard.home");
                                        },function(error){
                                             console.log(error);
                                        });
              }
              else{
                   HttpService.PostApi("/router/signin",user)
                                       .then(function(res) {
                                            localStorage.setItem("token",res.data.token);
                                            $state.go("dashboard.home");
                                       },function(error){
                                            console.log(error);
                                       });

              }
          //     _self.user = {};
        };
     //    _self.rememberMe = function() {
     //         var rememberMe = localStorage.getItem("token");
     //         if(rememberMe) {
     //           localStorage.removeItem("token");
     //         }
     //         else {
     //        localStorage.setItem("token","abc");
     //         }
     //    };
     }
