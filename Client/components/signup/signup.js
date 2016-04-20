angular
  .module("app.signup", [])

.controller("SignupController", ["AuthService", "mainRef", "MessageService",
  "HttpService",
  "$state", SignupController
]);

function SignupController(AuthService, mainRef, MessageService, HttpService,
  $state) {
  var _self = this;
  var mainRef = new Firebase(mainRef);
  _self.user = {};
  _self.disable = false;
  _self.signup = function(user) {
    _self.disable = true;
    MessageService.progressbar.start();
    AuthService.signup(user).then(function(res) {
        MessageService.progressbar.complete();
        toastr.info('Sign up successfully');
        _self.disable = false;
        _self.user = {};
        $state.go("login");
      }, function(err) {
        console.log(err)
        toastr.error("Email is ALready exist")
        MessageService.progressbar.complete();
        _self.disable = false;
      })
      //  HttpService.PostApi("/router/signup",user).then(function(res){
      //       if(res.data === "Email is ALready exist") {
      //             toastr.info('Email is already exist');
      //             MessageService.progressbar.complete();
      //
      //       }
      //       else {
      //             toastr.info('Please verify email for Sign in');
      //
      //             MessageService.progressbar.complete();
      //             _self.disable = false;
      //             _self.user = {};
      //             $state.go("login");
      //       }
      //
      //  },function(err){
      //        toastr.error(err);
      //        MessageService.progressbar.complete();
      //         _self.disable = false;
      //   });

  };
}
