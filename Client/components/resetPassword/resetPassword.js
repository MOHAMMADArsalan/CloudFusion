angular
  .module("app.resetPassword", [])

.controller("ResetPasswordController", ["HttpService", "AuthService",
  "MessageService", "$cookieStore",
  ResetPasswordController
]);

function ResetPasswordController(HttpService, AuthService, MessageService,
  $cookieStore) {
  var _self = this;

  _self.changePassword = function(pass) {
    MessageService.progressbar.start();
    AuthService.changePassword(pass).then(function(res) {
        MessageService.progressbar.complete();
        toastr.success(res);
        $cookieStore.get("cloudToken");
        console.log($cookieStore.get("cloudToken"));
      }, function(err) {
        toastr.success(err);
        MessageService.progressbar.complete();

      })
      // HttpService.PostApi("/router/passwordReset", pass).then(function(res) {
      //   console.log(res);
      // }, function(err) {
      //   console.log(err)
      // })
  }
}
