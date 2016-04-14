
angular.module("app.editUser",[])

      .controller("EditUserController",["HttpService","$stateParams","$state",EditUserController]);

      function EditUserController(HttpService,$stateParams,$state) {
            var _self = this;

          _self._id = $stateParams.id;
         _self.AllFranchice;
         _self.emailExistError = "";
        //Get All Franchises
        HttpService.GetApi("/router/getFranchises")
                        .then(function(res){
                        _self.AllFranchice = res.data;
                        },function(err){
                             console.log(err);
      });
          HttpService.GetApi("/router/getOneUser/"+ _self._id)
                          .then(function(res){
                          _self.EditUser = res.data;
                          },function(err){
                              console.log(err);
                          });


                          _self.editUser =  function(user,pass){
                                user.password = pass;
                                HttpService.PostApi("/router/editUser",user)
                                            .then(function(res){
                                           $state.go("dashboard.user")
                                            },function(err){
                                                  _self.error = "Error To Edit User"
                                            })
                          }
      }
