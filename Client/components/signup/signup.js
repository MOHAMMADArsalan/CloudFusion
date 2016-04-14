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
                        toastr.info('Email is already exist');
                        MessageService.progressbar.complete();
                         _self.disable = false;
                  }
                  else {
                        toastr.info('Please verify email for Sign in');

                        MessageService.progressbar.complete();
                        _self.disable = false;
                        _self.user = {};
                        $state.go("login");
                  }

             },function(err){
                   toastr.error(err);
                   MessageService.progressbar.complete();
                    _self.disable = false;
              });

       };
      }
