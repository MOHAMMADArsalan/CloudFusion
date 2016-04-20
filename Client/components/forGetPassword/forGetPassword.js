angular
  .module("app.forGetPassword", [])

.controller("ForgetPasswordController", ["HttpService", "AuthService",
  "MessageService", "$state",
  ForgetPasswordController
]);

function ForgetPasswordController(HttpService, AuthService, MessageService,
  $state) {
  var _self = this;
  _self.recoveryPass = function(email) {
    MessageService.progressbar.start();
    AuthService.forGetPassword(email).then(function(res) {
        MessageService.progressbar.complete();
        toastr.success(res);
        $state.go("login")
      }, function(err) {
        toastr.error(err);
        MessageService.progressbar.complete();
      })
      //  HttpService.PostApi("/router/forget",{email: email}).then(function(res){
      //        console.log(res);
      //  },function(err){
      //        console.log(err);
      //  })
  }
}
