
angular.module("app.editUser",[])

      .controller("EditUserController",["MessageService","HttpService","$stateParams","$state",EditUserController]);

      function EditUserController(MessageService,HttpService,$stateParams,$state) {
            var _self = this;

          _self._id = $stateParams.id;
         _self.AllFranchice;
         _self.emailExistError = "";
         MessageService.progressbar.start();
         _self.disable = false;
        //Get All Franchises
        HttpService.GetApi("/router/getFranchises")
                        .then(function(res){
                        MessageService.progressbar.complete();
                        _self.AllFranchice = res.data;
                        },function(err){
                        MessageService.progressbar.complete();
                             console.log(err);
      });
          HttpService.GetApi("/router/getOneUser/"+ _self._id)
                          .then(function(res){
                                console.log(res);
                        MessageService.progressbar.complete();
                        _self.EditUser = res.data;
                          },function(err){
                            MessageService.progressbar.complete();
                              console.log(err);
                          });


                          _self.editUser =  function(user,pass){
                                _self.disable = true;
                                 MessageService.progressbar.start();
                                user.password = pass;
                                HttpService.PostApi("/router/editUser",user)
                                            .then(function(res){
                                         MessageService.progressbar.complete();
                                         _self.disable = false;
                                          $state.go("dashboard.user");
                                            },function(err){
                                           MessageService.progressbar.complete();
                                           _self.disable = false;
                                          _self.error = "Error To Edit User";
                                            })
                          }
      }
