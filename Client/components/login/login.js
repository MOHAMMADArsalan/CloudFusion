angular
      .module("app.login", [])

      .controller("LoginController", ["HttpService","AuthService","$state",'$cookies','$cookieStore','$window',LoginController]);

      function LoginController(HttpService,AuthService, $state,$cookies,$cookieStore,$window) {
        var _self = this;
       _self.user = {};
        _self.login = function(user) {
             _self.ErrorUserNotExist = "";
             _self.varificationError = "";
             _self.error = "";
             if(user !== "") {
                  HttpService.PostApi("/router/signin",user)
                                       .then(function(res){
                                             if(res.data === "Please Varify Email") {
                                                  _self.varificationError = "Please Varify Your Email Address"
                                         } else  if(res.data === "Password does not match") {
                                                  _self.error = "Email Or Password does not match";
                                             }
                                             else if(res.data === "User Not Found with this Email Address"){
                                                  _self.ErrorUserNotExist = "User Not Found with this Email Address"
                                             }
                                             else if(user.rememberMe){
                                                  $cookieStore.put("cloudToken",res.data._id);

                                                  AuthService.isLoggedIn(res.data._id);
                                                  localStorage.setItem("token",res.data._id);
                                                  $state.go("dashboard.home");
                                             }
                                             else {
                                                  $cookieStore.put("cloudToken",res.data._id);
                                                  AuthService.isLoggedIn(res.data._id);
                                                  $state.go("dashboard.home");
                                         }

                                       },function(error){
                                            console.log(error);
                                       });
             }
        };
     }
