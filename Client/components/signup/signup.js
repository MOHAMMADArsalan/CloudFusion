angular
      .module("app.signup", [])

      .controller("SignupController", ["MessageService","HttpService", "$state", SignupController]);

      function SignupController(MessageService,HttpService, $state) {
        var _self = this;
        _self.user = {};
        _self.disable = false;
        _self.signup = function(user) {
             _self.disable = true;
            MessageService.progressbar.start();
             HttpService.PostApi("/router/signup",user).then(function(res){
                  if(res.data === "Email is ALready exist") {
                        _self.emailExistError = "Email is already exist"
                        MessageService.progressbar.complete();
                         _self.disable = false;
                  }
                  else {
                        MessageService.progressbar.complete();
                        _self.disable = false;
                        _self.user = {};
                        $state.go("login");
                  }

             },function(err){
                   console.log(err);
                   MessageService.progressbar.complete();
                    _self.disable = false;
              });

       };
      }
