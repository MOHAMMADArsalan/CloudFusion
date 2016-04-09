angular
      .module("app.adduser", [])

      .controller("AddUserController",["HttpService","$state", AddUserController]);

      function AddUserController(HttpService,$state){
       var _self = this;
       _self.error = "";
       _self.addUser = function(user) {
           if(user.confirmpassword != user.password){
               _self.error = "password does not match"
           }
           else{
               HttpService.PostApi("/router/adduser",user)
                           .then(function(res){
                               $state.go("dashboard.user");
                               _self.user = {};
                           },function(err){
                               console.log(err);
                           });
           }

      };
    }
