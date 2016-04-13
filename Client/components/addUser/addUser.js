angular
      .module("app.adduser", [])

      .controller("AddUserController",["HttpService","$state", AddUserController]);

      function AddUserController(HttpService,$state){
       var _self = this;
       _self.error = "";
       _self.AllFranchice;
       _self.emailExistError = "";
       //Get All Franchises
       HttpService.GetApi("/router/getFranchises")
                        .then(function(res){
                        _self.AllFranchice = res.data;
                        },function(err){
                            console.log(err);
                        });
       _self.addUser = function(user) {
            _self.emailExistError = "";
            _self.error = "";
           if(user.confirmpassword != user.password){
               _self.error = "password does not match"
           }
           else {
               HttpService.PostApi("/router/signup",user).then(function(res){
                                  if(res.data === "Email is ALready exist") {
                                        _self.emailExistError = "Email is ALready exist"
                                  }
                                  else {
                                      $state.go("dashboard.user");
                                      _self.user = {};
                                  }

                             },function(err){
                                   console.log(err);
                             });
           }

      };
    }
