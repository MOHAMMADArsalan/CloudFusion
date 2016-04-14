angular
      .module("app.adduser", [])

      .controller("AddUserController",["MessageService","HttpService","$state", AddUserController]);

      function AddUserController(MessageService,HttpService,$state){
       var _self = this;
       _self.error = "";
       _self.AllFranchice;
       _self.emailExistError = "";
       MessageService.progressbar.start();
       //Get All Franchises
       HttpService.GetApi("/router/getFranchises")
                        .then(function(res){
                        MessageService.progressbar.complete();    
                        _self.AllFranchice = res.data;
                        },function(err){
                            console.log(err);
                        });
       _self.addUser = function(user) {
           user.role_admin = false;
            _self.emailExistError = "";
            _self.error = "";
           if(user.confirmpassword != user.password){
               toastr.error("password does not match");
           }
           else {
               HttpService.PostApi("/router/signup",user).then(function(res){

                                  if(res.data === "Email is ALready exist") {
                                        toastr.error("Email is already exist");
                                  }
                                  else {
                                      toastr.success("User added");
                                      $state.go("dashboard.user");
                                      _self.user = {};
                                  }

                             },function(err){
                                   toastr.error(err);
                             });
           }

      };
    }
